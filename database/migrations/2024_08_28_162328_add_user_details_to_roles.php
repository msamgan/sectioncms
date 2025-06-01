<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->foreignId('business_id')->after('guard_name')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('created_by')->after('business_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->foreignId('updated_by')->after('created_by')->nullable()->constrained('users')->cascadeOnDelete();
            $table->boolean('is_active')->default(true)->after('updated_by');
        });
    }

    public function down(): void
    {
        Schema::table('roles', function (Blueprint $table) {
            //
        });
    }
};
