<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Adapters\InvoiceAdapter;
use App\Chargers\LanguageCharger;
use App\Models\Business;
use Illuminate\Console\Command;
use Stripe\Exception\ApiErrorException;
use Stripe\Stripe;
use Throwable;

final class DailyChargeCalculator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:daily-charge-calculator {businessId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Calculate daily charges for businesses resources';

    /**
     * Execute the console command.
     *
     * @throws ApiErrorException
     * @throws Throwable
     */
    public function handle(InvoiceAdapter $invoiceAdapter): int
    {
        $businessId = (int) $this->argument('businessId');

        if ($businessId <= 0) {
            $this->error('Invalid business ID provided.');

            return self::FAILURE;
        }

        $business = Business::query()->find($businessId);

        $proRatedCharges = (new LanguageCharger(businessId: $businessId))->proRateCharges();

        Stripe::setApiKey(config('cashier.secret'));

        // we have to put a delay here to ensure that the Stripe API is ready to accept requests
        $invoiceAdapter->createInvoice(stripeId: $business->stripeId())
            ->addLine(
                quantity: $proRatedCharges['chargeableUnits'],
                unitAmount: $proRatedCharges['changes'] * $proRatedCharges['daysMultiplier'],
                description: "Charge for {$proRatedCharges['chargeableUnits']} additional language(s) at \${$proRatedCharges['chargesInDollars']} each.",
                productName: 'Additional Languages Charge'
            )->pay();

        return self::SUCCESS;
    }
}
