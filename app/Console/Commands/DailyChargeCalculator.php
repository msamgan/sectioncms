<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Chargers\LanguageCharger;
use Illuminate\Console\Command;

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

    private array $invoiceLineItems;

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $businessId = (int) $this->argument('businessId');
        if ($businessId <= 0) {
            $this->error('Invalid business ID provided.');

            return self::FAILURE;
        }

        $languageCharger = new LanguageCharger(businessId: $businessId);

        $chargeableUnits = $languageCharger->getChargeableUnits();

        if ($chargeableUnits <= 0) {
            $this->info('No chargeable units for today.');

            return self::SUCCESS;
        }

        $changes = $languageCharger->getChanges();
        $changesInDollars = number_format($changes / 100, 2);

        $totalCharge = $chargeableUnits * $changes;
        $totalChargeInDollars = number_format($totalCharge / 100, 2);

        $this->invoiceLineItems[] = [
            'type' => 'language',
            'unit' => $languageCharger->getUnit(),
            'quantity' => $chargeableUnits,
            'amount' => $changesInDollars,
            'total' => $totalChargeInDollars,
            'description' => "Charge for {$chargeableUnits} additional language(s) at \${$changesInDollars} each.",
        ];

        return self::SUCCESS;
    }
}
