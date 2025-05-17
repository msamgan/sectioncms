<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Concerns\ApiResponses;
use App\Models\Business;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class BusinessTokenValidation
{
    use ApiResponses;

    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $businessToken = $request->bearerToken();

        if (! $businessToken) {
            return $this->error(message: 'unauthorized', code: 401);
        }

        $business = Business::query()->where('token', $businessToken)->first();

        if (! $business) {
            return $this->error(message: 'unauthorized', code: 401);
        }

        $request->attributes->set('business', $business);

        return $next($request);
    }
}
