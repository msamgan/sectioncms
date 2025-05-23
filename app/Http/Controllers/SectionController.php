<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Notification\NotifyUser;
use App\Actions\Section\CreateSection;
use App\Actions\Section\CreateSectionChildren;
use App\Actions\Section\UpdateSection;
use App\Http\Requests\DeleteSectionRequest;
use App\Http\Requests\StoreSectionRequest;
use App\Http\Requests\UpdateSectionRequest;
use App\Models\Section;
use App\Notifications\SectionCreated;
use App\Notifications\SectionDeleted;
use App\Notifications\SectionUpdated;
use App\Stores\SectionStore;
use App\Utils\Access;
use Exception;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Msamgan\Lact\Attributes\Action;
use Throwable;

final class SectionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Section/Index');
    }

    /**
     * @throws Exception|Throwable
     */
    #[Action(method: 'post', middleware: ['auth', 'check_has_business', 'can:section.create'])]
    public function store(StoreSectionRequest $request, CreateSection $createSection, CreateSectionChildren $createSectionChildren, NotifyUser $notifyUser): void
    {
        DB::beginTransaction();

        try {
            $section = $createSection->handle(['name' => $request->validated('name')]);
            $createSectionChildren->handle(section: $section, fields: $request->validated('fields'));

            $notifyUser->handle(new SectionCreated($section));

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    #[Action(params: ['section'], middleware: ['auth', 'check_has_business', 'can:section.view'])]
    public function show(Section $section): array
    {
        Access::businessCheck(businessId: $section->key('business_id'));

        return SectionStore::mapSection(section: $section->load('keys', 'keys.values'));
    }

    /**
     * @throws Throwable
     */
    #[Action(method: 'post', params: ['section'], middleware: ['auth', 'check_has_business', 'can:section.update'])]
    public function update(UpdateSectionRequest $request, Section $section, UpdateSection $updateSection, CreateSectionChildren $createSectionChildren, NotifyUser $notifyUser): void
    {
        DB::beginTransaction();
        try {
            SectionStore::deleteKeysAndValues(section: $section);
            $createSectionChildren->handle(
                section: $updateSection->handle($section, ['name' => $request->validated('name')]),
                fields: $request->validated('fields')
            );

            DB::commit();
            $notifyUser->handle(new SectionUpdated($section->refresh()));
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    #[Action(method: 'delete', params: ['section'], middleware: ['auth', 'check_has_business', 'can:section.delete'])]
    public function destroy(DeleteSectionRequest $request, Section $section, NotifyUser $notifyUser): void
    {
        $notifyUser->handle(new SectionDeleted($section));

        $section->delete();
    }

    /**
     * @throws FileNotFoundException
     * @throws ConnectionException
     */
    #[Action(middleware: ['auth', 'check_has_business', 'can:section.list'])]
    public function sections(Request $request): Collection
    {
        return Section::query()->where('business_id', Auth::user()->key('business_id'))
            ->when($request->get('q'), function ($query) use ($request): void {
                $query->where('name', 'like', '%' . $request->get('q') . '%');
            })
            ->get();
    }

    #[Action(middleware: ['auth', 'check_has_business', 'can:section.list'])]
    public function sectionCount(): int
    {
        return Section::query()->where('business_id', Auth::user()->key('business_id'))->count();
    }
}
