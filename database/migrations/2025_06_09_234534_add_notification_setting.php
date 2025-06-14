<?php

declare(strict_types=1);

use App\Models\Setting;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Setting::query()->create([
            'name' => 'Email Notifications',
            'description' => 'Enable or disable notifications via email.',
            'slug' => 'email-notifications',
            'group' => 'notifications',
            'type' => 'boolean',
            'default' => 'true',
        ]);

        Setting::query()->create([
            'name' => 'Auto Translate',
            'description' => 'When a new language is added, automatically translate all existing content to the new language.',
            'slug' => 'auto-translate',
            'group' => 'translation',
            'type' => 'boolean',
            'default' => 'true',
        ]);
    }

    public function down(): void
    {
        //
    }
};
