<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Business\UpdateBusiness;
use App\Actions\Notification\NotifyUser;
use App\Concerns\ApiResponses;
use App\Http\Requests\StoreBusinessRequest;
use App\Http\Requests\UpdateBusinessRequest;
use App\Models\Business;
use App\Notifications\AccessTokenRegenerated;
use Inertia\Inertia;
use Inertia\Response;
use Msamgan\Lact\Attributes\Action;
use Random\RandomException;

final class BusinessController extends Controller
{
    use ApiResponses;

    /**
     * Display a listing of the resource.
     */
    public function index(): void
    {
        //
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
    public function store(StoreBusinessRequest $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Business $business): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Business $business): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    #[Action(method: 'post', params: ['business'], middleware: ['auth', 'check_has_business', 'can:business.update'])]
    public function update(UpdateBusinessRequest $request, Business $business, UpdateBusiness $updateBusiness): void
    {
        $updateBusiness->handle(business: $business, data: $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Business $business): void
    {
        //
    }

    public function settings(): Response
    {
        return Inertia::render('Business/Settings/Index');
    }

    /**
     * @throws RandomException
     */
    #[Action(method: 'post', middleware: ['auth', 'check_has_business', 'can:business.update'])]
    public function regenerateToken(NotifyUser $notifyUser)
    {
        $business = auth()->user()->key('business');

        $business->saveKey('token', Business::generateToken());

        $notifyUser->handle(new AccessTokenRegenerated());

        return $business->refresh();
    }
}
