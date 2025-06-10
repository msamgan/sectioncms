<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Actions\Business\CreateAllowedResources;
use App\Actions\Language\CreateLanguage;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use MrPunyapal\LaravelAuthJobs\Jobs\Middleware\AuthenticateJob;

final class PostRegistration implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    public function middleware(): array
    {
        return [new AuthenticateJob];
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // dd(auth()->user());
        // (new CreateLanguage)->handle(['name' => 'English', 'code' => 'en'], isDefault: true);
        // (new CreateAllowedResources)->handle();
    }
}
