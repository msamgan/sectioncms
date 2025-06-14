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
            'clientSecret' => auth()->user()->key('business')->createSetupIntent()->client_secret,
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
        $business = auth()->user()->key('business');

        // if a user is not a stripe customer, create one
        if (! $business->hasStripeId()) {
            $business->createAsStripeCustomer();
        }

        DB::beginTransaction();

        // Attach the payment method to the user
        try {
            $paymentMethod = $createPaymentMethod->handle($request->validated());

            $notifyUser->handle(new PaymentMethodCreated($paymentMethod, auth()->user()));

            UserCard::query()->create([
                'user_id' => auth()->id(),
                'business_id' => $business->getKey(),
                'stripe_payment_method_id' => $request->get('payment_method'),
                'metadata' => $business->findPaymentMethod($request->get('payment_method')),
            ]);

            $business->updateDefaultPaymentMethod($request->get('payment_method'));

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    #[Action(method: 'delete', middleware: ['auth', 'check_has_business', 'can:payment_method.delete'])]
    public function destroy(DeletePaymentMethodRequest $request, NotifyUser $notifyUser): void
    {
        $paymentMethod = auth()->user()->key('business')->findPaymentMethod($request->get('payment_method'));

        $notifyUser->handle(new PaymentMethodDeleted($paymentMethod, auth()->user()));

        $paymentMethod->delete();
        UserCard::query()->where('stripe_payment_method_id', $request->get('payment_method'))->delete();
    }

    /**
     * Get all payment methods for the authenticated user.
     */
    #[Action(middleware: ['auth', 'check_has_business', 'can:payment_method.list'])]
    public function paymentMethods(): array
    {
        // Get all payment methods
        $paymentMethods = auth()->user()->key('business')->paymentMethods();
        // Get default payment method
        $defaultPaymentMethod = auth()->user()->key('business')->defaultPaymentMethod();

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
        $request->validate(['payment_method' => 'required|string']);

        // Update the default payment method
        auth()->user()->key('business')->updateDefaultPaymentMethod($request->get('payment_method'));

        return response()->json(['message' => 'Default payment method updated successfully']);
    }
}
