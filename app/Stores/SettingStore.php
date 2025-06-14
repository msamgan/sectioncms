<?php

declare(strict_types=1);

namespace App\Stores;

use App\Models\Setting;
use App\Models\UserSetting;
use Illuminate\Database\Eloquent\Collection;

final class SettingStore
{
    public static function userSettings(int $userId): Collection
    {
        $settings = Setting::query()
            ->join('user_settings', 'settings.id', '=', 'user_settings.setting_id')
            ->where('user_settings.user_id', $userId)
            ->get(['settings.*', 'user_settings.value as value']);

        foreach ($settings as $setting) {
            if ($setting->key('type') === 'boolean') {
                $setting->value = (bool) $setting->value;
            }
        }

        return $settings->groupBy('group');
    }

    public static function userSetting(int $userId, int $settingId): ?UserSetting
    {
        return UserSetting::query()
            ->where('user_id', $userId)
            ->where('setting_id', $settingId)
            ->first();
    }

    public static function settingBySlug(string $slug): ?Setting
    {
        return Setting::query()
            ->where('slug', $slug)
            ->first();
    }
}
