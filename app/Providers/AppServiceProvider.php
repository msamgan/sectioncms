<?php

declare(strict_types=1);

namespace App\Providers;

use App\Enums\PermissionEnum;
use App\Models\User;
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\Auth;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->loadScrambleConfig();
        $this->loadMacros();
    }

    private function autoloadRoutes(): void
    {
        foreach (File::allFiles(base_path(self::ROUTE_MODULE_DIR)) as $file) {
            Route::middleware(['web'])->group(function () use ($file): void {
                $this->loadRoutesFrom(base_path(self::ROUTE_MODULE_DIR) . $file->getFilename());
            });
        }
    }

    private function loadScrambleConfig(): void
    {
        Gate::define('viewApiDocs', fn (User $user): bool => $user->can(PermissionEnum::ApiDocView->value));
        Scramble::configure()->withDocumentTransformers(function (OpenApi $openApi): void {
            $openApi->secure(SecurityScheme::http('bearer'));
        });
    }

    private function loadMacros(): void
    {
        Auth::macro('businessId', fn (): ?int => Auth::user()?->key('business_id'));

        ResponseFactory::macro('ok', fn ($payload) => response()->json([
            'status' => 'ok',
            'message' => 'Request was successful',
            'error' => null,
            'payload' => $payload,
        ]));

        ResponseFactory::macro('notFound', fn (string $slug) => response()->json([
            'status' => 'not_found',
            'message' => 'Resource not found',
            'error' => 'Resource with id:' . $slug . ' not found',
            'payload' => null,
        ], 404));

        ResponseFactory::macro('error', function (?string $message = null, int $code = 500) {
            if (! $message) {
                $message = 'An error occurred while processing your request';
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Request failed',
                'error' => $message,
                'payload' => null,
            ], $code);
        });
    }
}
