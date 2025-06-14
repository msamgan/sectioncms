<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Actions\Notification\NotifyUser;
use App\Http\Controllers\Controller;
use App\Notifications\PasswordUpdated;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

final class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request, NotifyUser $notifyUser): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        $notifyUser->handle(new PasswordUpdated($request->user()));

        return back();
    }
}
