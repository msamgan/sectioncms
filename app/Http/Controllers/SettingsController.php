<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ToggleSettingRequest;
use App\Models\Setting;
use App\Stores\SettingStore;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Collection;
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
    public function settings(): Collection
    {
        return SettingStore::userSettings(userId: auth()->id());
    }

    #[Action(params: ['setting'], middleware: ['auth', 'verified'])]
    public function toggleSetting(ToggleSettingRequest $request, Setting $setting): void
    {
        $userSetting = SettingStore::userSetting(userId: auth()->id(), settingId: $setting->getKey());
        $userSetting->update(['value' => ! $userSetting->key('value')]);
    }
}
