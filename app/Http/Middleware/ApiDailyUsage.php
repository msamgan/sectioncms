<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class ApiDailyUsage
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $usageEntry = \App\Models\ApiDailyUsage::query()
            ->where('business_id', $request->get('business')->getKey())
            ->whereDate('created_at', now())
            ->first();

        if ($usageEntry) {
            $usageEntry->increment('count');
        } else {
            \App\Models\ApiDailyUsage::query()->create([
                'business_id' => $request->get('business')->getKey(),
                'count' => 1,
            ]);
        }

        return $next($request);
    }
}
