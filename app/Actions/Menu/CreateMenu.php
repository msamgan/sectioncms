<?php

declare(strict_types=1);

namespace App\Actions\Menu;

use App\Models\Menu;

final class CreateMenu
{
    public function handle(
        string $label,
        string $route,
        string $icon,
        ?string $permission,
        ?int $order = 0,
        ?bool $isActive = true,
        ?int $parent = null
    ): Menu {
        return Menu::query()->create([
            'parent_id' => $parent,
            'label' => $label,
            'route' => $route,
            'icon' => $icon,
            'permission' => $permission,
            'order' => $order,
            'is_active' => $isActive,
        ]);
    }
}
