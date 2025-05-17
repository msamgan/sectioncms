<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\User;
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Override;

final class AppServiceProvider extends ServiceProvider
{
    private const string ROUTE_MODULE_DIR = 'routes/modules/';

    /**
     * Register any application services.
     */
    #[Override]
    public function register(): void
    {
        $this->autoloadRoutes();
        $this->loadMacros();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('viewApiDocs', fn (User $user): true => true);

        Scramble::configure()
            ->withDocumentTransformers(function (OpenApi $openApi): void {
                $openApi->secure(
                    SecurityScheme::http('bearer')
                );
            });

    }

    private function autoloadRoutes(): void
    {
        foreach (File::allFiles(base_path(self::ROUTE_MODULE_DIR)) as $file) {
            Route::middleware(['web'])->group(function () use ($file): void {
                $this->loadRoutesFrom(base_path(self::ROUTE_MODULE_DIR) . $file->getFilename());
            });
        }
    }

    private function loadMacros(): void
    {
        // Auth::macro('businessId', fn (): int => Auth::user()->key('business_id'));
    }
}
