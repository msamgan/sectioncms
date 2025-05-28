<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Notification\NotifyUser;
use App\Actions\PaymentMethod\CreatePaymentMethod;
use App\Http\Requests\DeletePaymentMethodRequest;
use App\Http\Requests\StorePaymentMethodRequest;
use App\Models\UserCard;
use App\Notifications\PaymentMethodCreated;
use App\Notifications\PaymentMethodDeleted;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Cashier\Exceptions\CustomerAlreadyCreated;
use Msamgan\Lact\Attributes\Action;
use Stripe\Exception\ApiErrorException;
use Throwable;

final class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the payment methods.
     */
    public function index(): Response
    {
        return Inertia::render('PaymentMethod/Index')->with([
            'publishableKey' => config('cashier.key'),
            'clientSecret' => auth()->user()->createSetupIntent()->client_secret,
        ]);
    }

    /**
     * Store a new payment method.
     *
     * @throws CustomerAlreadyCreated
     * @throws Exception|Throwable
     */
    #[Action(method: 'post', middleware: ['auth', 'check_has_business', 'can:payment_method.create'])]
    public function store(StorePaymentMethodRequest $request, CreatePaymentMethod $createPaymentMethod, NotifyUser $notifyUser): void
    {
        $user = $request->user();

        // if a user is not a stripe customer, create one
        if (! $user->hasStripeId()) {
            $user->createAsStripeCustomer();
        }

        DB::beginTransaction();

        // Attach the payment method to the user
        try {
            $paymentMethod = $createPaymentMethod->handle($request->validated());

            $notifyUser->handle(new PaymentMethodCreated($paymentMethod));

            UserCard::query()->create([
                'user_id' => $user->id,
                'stripe_payment_method_id' => $request->get('payment_method'),
                'metadata' => $user->findPaymentMethod($request->get('payment_method')),
            ]);

            auth()->user()->updateDefaultPaymentMethod($request->get('payment_method'));

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    #[Action(method: 'delete', middleware: ['auth', 'check_has_business', 'can:payment_method.delete'])]
    public function destroy(DeletePaymentMethodRequest $request, NotifyUser $notifyUser): void
    {
        $paymentMethod = auth()->user()->findPaymentMethod($request->get('payment_method'));

        $notifyUser->handle(new PaymentMethodDeleted($paymentMethod));

        $paymentMethod->delete();
    }

    /**
     * Get all payment methods for the authenticated user.
     */
    #[Action(middleware: ['auth', 'check_has_business', 'can:payment_method.list'])]
    public function paymentMethods(): array
    {
        // Get all payment methods
        $paymentMethods = auth()->user()->paymentMethods();
        // Get default payment method
        $defaultPaymentMethod = auth()->user()->defaultPaymentMethod();

        return [
            'payment_methods' => $paymentMethods,
            'default_payment_method' => $defaultPaymentMethod,
        ];
    }

    /**
     * Update the default payment method.
     *
     * @throws ApiErrorException
     */
    #[Action(method: 'post', middleware: ['auth'])]
    public function updateDefault(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string',
        ]);

        $user = $request->user();

        // Update the default payment method
        $user->updateDefaultPaymentMethod($request->payment_method);

        return response()->json(['message' => 'Default payment method updated successfully']);
    }
}
