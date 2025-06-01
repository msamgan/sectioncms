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
use App\Stores\MediumStore;
use Exception;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Msamgan\Lact\Attributes\Action;
use Throwable;

/**
 * @property string $name
 */
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
            $media = $createMedium->handle();
            $notifyUser->handle(new MediumCreated($media));
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    #[Action(method: 'delete', params: ['medium'], middleware: ['auth', 'check_has_business', 'can:medium.delete'])]
    public function destroy(DeleteMediumRequest $request, Medium $medium, NotifyUser $notifyUser): void
    {
        $notifyUser->handle(new MediumDeleted($medium));

        $medium->delete();
    }

    /**
     * @throws FileNotFoundException
     * @throws ConnectionException
     */
    #[Action(middleware: ['auth', 'check_has_business', 'can:medium.list'])]
    public function media(Request $request): Collection
    {
        return MediumStore::media(businessId: auth()->businessId(), q: $request->get('q'));
    }

    #[Action(middleware: ['auth', 'check_has_business', 'can:medium.list'])]
    public function mediaSize(): float
    {
        return MediumStore::mediaSize(businessId: auth()->businessId());
    }
}
