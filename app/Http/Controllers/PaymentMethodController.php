<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Cashier\Payment;
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
            'intent' => auth()->user()->createSetupIntent(),
        ]);
    }

    /**
     * Store a new payment method.
     *
     * @throws ApiErrorException
     */
    #[Action(method: 'post', middleware: ['auth'])]
    public function store(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string',
        ]);

        $user = $request->user();

        // Add the payment method to the user
        $paymentMethod = $user->addPaymentMethod($request->payment_method);

        // If this is the first payment method, make it the default
        if (! $user->hasDefaultPaymentMethod()) {
            $user->updateDefaultPaymentMethod($paymentMethod->id);
        }

        return $paymentMethod;
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
