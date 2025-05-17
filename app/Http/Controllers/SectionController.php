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
use Exception;
use Illuminate\Database\Eloquent\Collection;
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
            $createSectionChildren->handle(
                section: $createSection->handle(['name' => $request->validated('name')]),
                fields: $request->validated('fields')
            );

            $notifyUser->handle(new SectionCreated(auth()->user()));

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    #[Action(params: ['section'], middleware: ['auth', 'check_has_business', 'can:section.view'])]
    public function show(Section $section): Section
    {
        // Access::businessCheck(businessId: $section->business_id);

        return $section;
    }

    #[Action(method: 'post', params: ['section'], middleware: ['auth', 'check_has_business', 'can:section.update'])]
    public function update(UpdateSectionRequest $request, Section $section, UpdateSection $updateSection, NotifyUser $notifyUser): void
    {
        $updateSection->handle($section, $request->validated());

        $notifyUser->handle(new SectionUpdated(auth()->user()));
    }

    #[Action(method: 'delete', params: ['section'], middleware: ['auth', 'check_has_business', 'can:section.delete'])]
    public function destroy(DeleteSectionRequest $request, Section $section, NotifyUser $notifyUser): void
    {
        $notifyUser->handle(new SectionDeleted(auth()->user()));

        $section->delete();
    }

    #[Action(middleware: ['auth', 'check_has_business', 'can:section.list'])]
    public function sections(): Collection
    {
        return Section::query()->where('business_id', Auth::user()->key('business_id'))->get();
    }
}
