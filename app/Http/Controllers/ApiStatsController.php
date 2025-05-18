<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\ApiDailyUsage;
use Msamgan\Lact\Attributes\Action;

final class ApiStatsController extends Controller
{
    #[Action(middleware: ['auth', 'check_has_business'])]
    public function stats(): array
    {
        $labels = [];
        $data = [];
        ApiDailyUsage::query()->where('business_id', auth()->user()->key('business_id'))->get()->map(function ($item) use (&$labels, &$data) {
            $labels[] = $item->key('created_at')->format('Y-m-d');
            $data[] = $item->key('count');
        });

        return [
            'labels' => $labels,
            'data' => $data,
        ];
    }
}
