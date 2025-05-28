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
            throw new Error('Invalid payment method or already exists: ' . $e->getMessage());
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
    public function destroy(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string',
        ]);

        $user = $request->user();
        $paymentMethodId = $request->payment_method;

        // Check if this is the default payment method
        $defaultPaymentMethod = $user->defaultPaymentMethod();
        if ($defaultPaymentMethod && $defaultPaymentMethod->id === $paymentMethodId) {
            return response()->json(['message' => 'Cannot delete default payment method'], 422);
        }

        // Delete the payment method
        $paymentMethod = $user->findPaymentMethod($paymentMethodId);
        $paymentMethod->delete();

        return response()->json(['message' => 'Payment method deleted successfully']);
    }

    /**
     * Get all payment methods for the authenticated user.
     *
     * @throws ApiErrorException
     */
    #[Action(middleware: ['auth'])]
    public function paymentMethods(Request $request)
    {
        $user = $request->user();

        // Get all payment methods
        $paymentMethods = $user->paymentMethods();

        // Get default payment method
        $defaultPaymentMethod = $user->defaultPaymentMethod();

        // Mark default payment method
        $paymentMethods = collect($paymentMethods)->map(function ($method) use ($defaultPaymentMethod) {
            $method->isDefault = $defaultPaymentMethod?->id === $method->id;

            return $method;
        });

        return $paymentMethods;
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
