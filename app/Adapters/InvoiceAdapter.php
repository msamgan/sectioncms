<?php

declare(strict_types=1);

namespace App\Adapters;

use RuntimeException;
use Stripe\Exception\ApiErrorException;
use Stripe\Invoice;
use Throwable;

final class InvoiceAdapter
{
    private mixed $invoice;

    private array $lineItems = [];

    /**
     * @throws ApiErrorException
     */
    public function createInvoice(string $stripeId): self
    {
        $this->invoice = Invoice::create(['customer' => $stripeId]);

        return $this;
    }

    /**
     * @throws Throwable
     */
    public function addLine(int $quantity, float $unitAmount, string $description, string $productName): self
    {
        throw_unless($this->invoice !== null, new RuntimeException('Invoice must be created before adding lines.'));

        throw_if($quantity <= 0 || $unitAmount <= 0, new RuntimeException('Quantity and unit amount must be greater than zero.'));

        $lineData = [
            'quantity' => $quantity,
            'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                    'name' => $productName,
                ],
                'unit_amount_decimal' => $unitAmount,
            ],
            'description' => $description,
        ];

        $this->lineItems[] = $lineData;

        $this->invoice->addLines([
            'lines' => [$this->lineItems],
        ]);

        return $this;
    }

    public function pay(): void
    {
        $this->invoice->pay();
        $this->invoice = null; // Clear the invoice after finalizing and paying
    }
}
