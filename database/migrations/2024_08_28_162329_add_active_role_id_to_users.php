<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->after('remember_token')->nullable()->constrained('roles')->cascadeOnDelete();
            $table->foreignId('created_by')->after('remember_token')->nullable()->constrained('users')->cascadeOnDelete();
            $table->foreignId('updated_by')->after('created_by')->nullable()->constrained('users')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
