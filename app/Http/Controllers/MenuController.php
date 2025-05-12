<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Models\Menu;
use Illuminate\Database\Eloquent\Collection;
use Msamgan\Lact\Attributes\Action;

final class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[Action(middleware: ['auth'])]
    public function index(): Collection
    {
        return Menu::query()
            ->whereIn('permission', auth()->user()->getAllPermissions()->pluck('name'))
            ->where('is_active', true)
            ->with('parent')
            ->orderBy('order')
            ->get()->groupBy('parent.label');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMenuRequest $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMenuRequest $request, Menu $menu): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu): void
    {
        //
    }
}
