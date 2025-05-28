<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('stripe_payment_method_id')->unique();
            $table->json('metadata')->nullable(); // Optional metadata field for additional information
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_cards');
    }
};
