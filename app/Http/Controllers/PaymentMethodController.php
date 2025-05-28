<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\UserCard;
use Error;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Cashier\Exceptions\CustomerAlreadyCreated;
use Msamgan\Lact\Attributes\Action;
use Stripe\Exception\ApiErrorException;

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
     */
    #[Action(method: 'post', middleware: ['auth'])]
    public function store(Request $request): void
    {
        $request->validate([
            'payment_method' => 'required|string',
        ]);

        $user = $request->user();
        $paymentMethod = $request->get('payment_method');

        // if a user is not a stripe customer, create one
        if (! $user->hasStripeId()) {
            $user->createAsStripeCustomer();
        }

        // Attach the payment method to the user
        try {
            $user->addPaymentMethod($paymentMethod);
        } catch (ApiErrorException $e) {
            throw new Error('Invalid payment method or already exists: ' . $e->getMessage(), $e->getCode(), $e);
        }

        UserCard::query()->create([
            'user_id' => $user->id,
            'stripe_payment_method_id' => $paymentMethod,
            'metadata' => $user->findPaymentMethod($paymentMethod),
        ]);

        if (! $user->defaultPaymentMethod()) {
            $user->updateDefaultPaymentMethod($paymentMethod);
        }
    }

    /**
     * Remove the specified payment method.
     *
     * @throws ApiErrorException
     */
    #[Action(method: 'delete', middleware: ['auth'])]
    public function destroy(Request $request): void
    {
        $request->validate([
            'payment_method' => 'required|string',
        ]);

        $user = $request->user();
        $paymentMethodId = $request->payment_method;

        // Check if this is the default payment method
        $defaultPaymentMethod = $user->defaultPaymentMethod();
        if ($defaultPaymentMethod && $defaultPaymentMethod->id === $paymentMethodId) {
            return;
        }

        // Delete the payment method
        $paymentMethod = $user->findPaymentMethod($paymentMethodId);
        $paymentMethod->delete();
    }

    /**
     * Get all payment methods for the authenticated user.
     */
    #[Action(middleware: ['auth'])]
    public function paymentMethods(Request $request)
    {
        $user = $request->user();

        // Get all payment methods
        $paymentMethods = $user->paymentMethods();
        // Get default payment method
        $defaultPaymentMethod = $user->defaultPaymentMethod();

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
