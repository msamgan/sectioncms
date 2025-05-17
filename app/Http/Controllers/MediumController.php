<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Medium\CreateMedium;
use App\Actions\Notification\NotifyUser;
use App\Http\Requests\DeleteMediumRequest;
use App\Http\Requests\StoreMediumRequest;
use App\Models\Medium;
use App\Notifications\MediumCreated;
use App\Notifications\MediumDeleted;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Msamgan\Lact\Attributes\Action;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Throwable;

final class MediumController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Medium/Index');
    }

    /**
     * @throws Exception|Throwable
     */
    #[Action(method: 'post', middleware: ['auth', 'check_has_business', 'can:medium.create'])]
    public function store(StoreMediumRequest $request, CreateMedium $createMedium, NotifyUser $notifyUser): void
    {
        try {
            $createMedium->handle();
            $notifyUser->handle(new MediumCreated(auth()->user()));
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    #[Action(method: 'delete', params: ['medium'], middleware: ['auth', 'check_has_business', 'can:medium.delete'])]
    public function destroy(DeleteMediumRequest $request, Medium $medium, NotifyUser $notifyUser): void
    {
        $notifyUser->handle(new MediumDeleted(auth()->user()));

        $medium->delete();
    }

    #[Action(middleware: ['auth', 'check_has_business', 'can:medium.list'])]
    public function media(): Collection
    {
        return Media::query()->where('custom_properties->businessId', Auth::user()->key('business_id'))->get()
            ->map(fn ($medium): array => [
                'id' => $medium->id,
                'url' => $medium->getUrl(),
                'name' => $medium->name,
                'type' => $medium->mime_type,
                'size' => $medium->size,
                'preview' => $medium->getUrl('preview'),
            ]);
    }
}
