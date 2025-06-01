<?php

declare(strict_types=1);

namespace App\Stores;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

final class UserStore
{
    public static function users(int $businessId, ?string $q): Collection
    {
        $query = User::query()->where('business_id', $businessId)
            ->where('id', '!=', auth()->id())
            ->with(['roles']);

        if (! auth()->user()->hasRole([RoleEnum::Business, RoleEnum::SuperAdmin])) {
            $query->whereDoesntHave('roles', function ($q): void {
                $q->where('display_name', RoleEnum::Business);
            });
        }

        $query->when($q, function ($query) use ($q): void {
            $query->where('name', 'like', "%{$q}%")
                ->orWhere('email', 'like', "%{$q}%");
        });

        return $query->get();
    }

    public static function userCount(int $businessId): int
    {
        return User::query()->where('business_id', $businessId)->count();
    }
}
