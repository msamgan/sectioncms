<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('address')->nullable();
            $table->string('country')->default('US');
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->string('timezone')->nullable()->default('GMT-05:00');
            $table->string('token')->unique()->nullable();
            $table->timestamps();
        });

        Schema::create('resource_tracking', function (Blueprint $table) {
            $table->foreignId('business_id')->constrained()->onDelete('cascade');
            $table->string('type');
            $table->string('unit');
            $table->integer('allowed')->default(0);
            $table->float('charges')->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
