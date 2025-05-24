<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Business\CreateBusiness;
use App\Actions\Business\UpdateBusiness;
use App\Actions\Language\CreateLanguage;
use App\Actions\Notification\NotifyUser;
use App\Http\Requests\DeleteBusinessRequest;
use App\Http\Requests\StoreBusinessRequest;
use App\Http\Requests\UpdateBusinessRequest;
use App\Models\Business;
use App\Notifications\AccessTokenRegenerated;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Msamgan\Lact\Attributes\Action;
use Random\RandomException;
use RuntimeException;

final class BusinessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Business/Index');
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
     *
     * @throws RandomException
     */
    #[Action(method: 'post', middleware: ['auth', 'check_has_business', 'can:business.update'])]
    public function store(StoreBusinessRequest $request, CreateBusiness $createBusiness, CreateLanguage $createLanguage): void
    {
        $createBusiness->handle(
            user: $request->user(),
            businessName: parse_url((string) $request->validated('name'), PHP_URL_HOST),
            makeBusinessActive: true
        );
        $createLanguage->handle(['name' => 'English', 'code' => 'en']);
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
    #[Action(method: 'delete', params: ['business'], middleware: ['auth', 'check_has_business', 'can:business.update'])]
    public function destroy(DeleteBusinessRequest $request, Business $business): void
    {
        $notSelectedBusiness = Business::query()
            ->where('user_id', $request->user()->getKey())
            ->where('id', '!=', $business->getKey())
            ->first();

        throw_unless($notSelectedBusiness, new RuntimeException('No other business found.'));

        $request->user()->saveKey('business_id', $notSelectedBusiness->getKey());
        $business->delete();
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

    /**
     * @throws FileNotFoundException
     * @throws ConnectionException
     */
    #[Action(middleware: ['auth', 'check_has_business', 'can:business.update'])]
    public function businesses(Request $request)
    {
        return Business::query()->where('user_id', auth()->user()->getKey())
            ->when($request->input('q'), function ($query) use ($request): void {
                $query->where('name', 'like', '%' . $request->get('q') . '%');
            })->get();
    }

    #[Action(method: 'post', params: ['business'], middleware: ['auth', 'check_has_business', 'can:business.update'])]
    public function select(Request $request, Business $business): void
    {
        $request->user()->saveKey('business_id', $business->getKey());
    }
}
