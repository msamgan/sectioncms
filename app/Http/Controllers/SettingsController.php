<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ToggleSettingRequest;
use App\Models\Setting;
use App\Models\UserSetting;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Msamgan\Lact\Attributes\Action;

final class SettingsController extends Controller
{
    /**
     * Display the merged settings page.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Settings/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    #[Action(middleware: ['auth', 'verified'])]
    public function notificationSettings()
    {
        $settings = Setting::query()->where('group', 'notifications')->get();
        foreach ($settings as $setting) {
            $setting->value = (auth()->user()->setting(key: $setting->key('slug')))->key('value') ?? $setting->default;
            if ($setting->key('type') === 'boolean') {
                $setting->value = (bool) $setting->value;
            }
        }

        return $settings;
    }

    public function toggleSetting(ToggleSettingRequest $request): Response
    {
        $userSettingValue = (auth()->user()->setting(key: $request->get('slug')))->key('value');
        UserSetting::query()
            ->where('setting_id', Setting::query()->where('slug', $request->get('slug'))->firstOrFail()->getKey())
            ->where('user_id', auth()->id())->update([
                'value' => ! $userSettingValue,
            ]);
    }
}
