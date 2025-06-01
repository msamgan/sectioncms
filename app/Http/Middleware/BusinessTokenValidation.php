<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\Business;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class BusinessTokenValidation
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $businessToken = $request->bearerToken();

        if (! $businessToken) {
            return response()->error(message: 'unauthorized', code: 401);
        }

        $business = Business::query()->where('token', $businessToken)->first();

        if (! $business) {
            return response()->error(message: 'unauthorized', code: 401);
        }

        $request->attributes->set('business', $business);

        return $next($request);
    }
}
