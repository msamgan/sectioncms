<?php

declare(strict_types=1);

namespace App\Actions\Setting;

use App\Models\Setting;
use App\Models\UserSetting;

final class CreateSetting
{
    public function handle(?int $userId = null): void
    {
        if (! $userId) {
            $userId = auth()->id();
        }

        foreach (Setting::all() as $setting) {
            $userSetting = UserSetting::query()
                ->where('setting_id', $setting->id)
                ->where('user_id', $userId)
                ->first();

            if ($userSetting) {
                continue;
            }

            UserSetting::query()->create([
                'user_id' => $userId,
                'setting_id' => $setting->id,
                'value' => $setting->default,
            ]);
        }
    }
}
