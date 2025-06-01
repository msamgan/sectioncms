<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use Database\Factories\MediumFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method getUrl() // Returns the URL of the medium
 */
final class Medium extends Model
{
    /** @use HasFactory<MediumFactory> */
    use HasFactory;

    use ModelFunctions;
}
