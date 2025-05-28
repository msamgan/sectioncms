<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Notification\NotifyUser;
use App\Actions\PaymentMethod\CreatePaymentMethod;
use App\Actions\PaymentMethod\UpdatePaymentMethod;
use App\Http\Requests\DeletePaymentMethodRequest;
use App\Http\Requests\StorePaymentMethodRequest;
use App\Http\Requests\UpdatePaymentMethodRequest;
use App\Models\PaymentMethod;
use App\Notifications\PaymentMethodCreated;
use App\Notifications\PaymentMethodDeleted;
use App\Notifications\PaymentMethodUpdated;
use App\Utils\Access;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Msamgan\Lact\Attributes\Action;
use Throwable;

final class PaymentMethodController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('PaymentMethod/Index');
    }

    /**
     * @throws Exception|Throwable
     */
    #[Action(method: 'post', middleware: ['auth', 'check_has_business', 'can:payment_method.create'])]
    public function store(StorePaymentMethodRequest $request, CreatePaymentMethod $createPaymentMethod, NotifyUser $notifyUser): void
    {
        DB::beginTransaction();

        try {
            $paymentMethod = $createPaymentMethod->handle($request->validated());

            $notifyUser->handle(new PaymentMethodCreated($paymentMethod));

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    #[Action(params: ['paymentMethod'], middleware: ['auth', 'check_has_business', 'can:payment_method.view'])]
    public function show(PaymentMethod $paymentMethod): PaymentMethod
    {
        Access::businessCheck(businessId: $paymentMethod->business_id);

        return $paymentMethod;
    }

    #[Action(method: 'post', params: ['paymentMethod'], middleware: ['auth', 'check_has_business', 'can:payment_method.update'])]
    public function update(UpdatePaymentMethodRequest $request, PaymentMethod $paymentMethod, UpdatePaymentMethod $updatePaymentMethod, NotifyUser $notifyUser): void
    {
        DB::beginTransaction();

        try {
            $updatePaymentMethod->handle($paymentMethod, $request->validated());

            $notifyUser->handle(new PaymentMethodUpdated($paymentMethod->refresh()));

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    #[Action(method: 'delete', params: ['paymentMethod'], middleware: ['auth', 'check_has_business', 'can:payment_method.delete'])]
    public function destroy(DeletePaymentMethodRequest $request, PaymentMethod $paymentMethod, NotifyUser $notifyUser): void
    {
        $notifyUser->handle(new PaymentMethodDeleted($paymentMethod));

        $paymentMethod->delete();
    }

    #[Action(middleware: ['auth', 'check_has_business', 'can:payment_method.list'])]
    public function paymentMethods(): Collection
    {
        return PaymentMethod::query()->where('business_id', Auth::user()->key('business_id'))->get();
    }
}
