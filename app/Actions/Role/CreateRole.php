<?php

declare(strict_types=1);

namespace App\Actions\Role;

use App\Models\Role;
use Illuminate\Support\Str;
use Illuminate\Support\Stringable;

final class CreateRole
{
    public static function processRoleName(string $name): Stringable
    {
        return Str::of($name)->trim()->title();
    }

    public function handle(string $name): \Spatie\Permission\Contracts\Role|\Spatie\Permission\Models\Role
    {
        $name = self::processRoleName($name);

        $roleExists = Role::query()
            ->where('display_name', $name)
            ->where('business_id', auth()->user()->key('business_id') ?? null)
            ->first();

        if ($roleExists) {
            return $roleExists;
        }

        return Role::create([
            'name' => Str::uuid(),
            'display_name' => $name,
            'guard_name' => 'web',
            'business_id' => auth()->user()->key('business_id') ?? null,
            'created_by' => auth()->id() ?? null,
        ]);
    }
}
