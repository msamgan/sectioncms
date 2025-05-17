<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Language\CreateLanguage;
use App\Actions\Language\UpdateLanguage;
use App\Actions\Notification\NotifyUser;
use App\Http\Requests\DeleteLanguageRequest;
use App\Http\Requests\StoreLanguageRequest;
use App\Http\Requests\UpdateLanguageRequest;
use App\Models\Language;
use App\Notifications\LanguageCreated;
use App\Notifications\LanguageDeleted;
use App\Notifications\LanguageUpdated;
use App\Utils\Access;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Msamgan\Lact\Attributes\Action;
use Throwable;

final class LanguageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Language/Index');
    }

    /**
     * @throws Exception|Throwable
     */
    #[Action(method: 'post', middleware: ['auth', 'check_has_business', 'can:language.create'])]
    public function store(StoreLanguageRequest $request, CreateLanguage $createLanguage, NotifyUser $notifyUser): void
    {
        DB::beginTransaction();

        try {
            $createLanguage->handle($request->validated());

            $notifyUser->handle(new LanguageCreated(auth()->user()));

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    #[Action(params: ['language'], middleware: ['auth', 'check_has_business', 'can:language.view'])]
    public function show(Language $language): Language
    {
        Access::businessCheck(businessId: $language->key('business_id'));

        return $language;
    }

    #[Action(method: 'post', params: ['language'], middleware: ['auth', 'check_has_business', 'can:language.update'])]
    public function update(UpdateLanguageRequest $request, Language $language, UpdateLanguage $updateLanguage, NotifyUser $notifyUser): void
    {
        $updateLanguage->handle($language, $request->validated());

        $notifyUser->handle(new LanguageUpdated(auth()->user()));
    }

    #[Action(method: 'delete', params: ['language'], middleware: ['auth', 'check_has_business', 'can:language.delete'])]
    public function destroy(DeleteLanguageRequest $request, Language $language, NotifyUser $notifyUser): void
    {
        $notifyUser->handle(new LanguageDeleted(auth()->user()));

        $language->delete();
    }

    #[Action(middleware: ['auth', 'check_has_business', 'can:language.list'])]
    public function languages(): Collection
    {
        return Language::query()->where('business_id', Auth::user()->key('business_id'))->get();
    }
}
