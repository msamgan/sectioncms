<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Schedule;

Schedule::command('telescope:prune --hours=48')->daily();
Schedule::command('activitylog:clean')->daily();
