<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\ModelFunctions;
use App\Enums\RoleEnum;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Laravel\Cashier\Billable;
use Override;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

/**
 * @method static create(array $array)
 *
 * @property int business_id
 * @property $unreadNotifications
 */
final class User extends Authenticatable implements HasMedia, MustVerifyEmail
{
    use Billable;
    use CausesActivity;
    use HasFactory, Notifiable;
    use HasRoles;
    use InteractsWithMedia;
    use ModelFunctions;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'business_id',
        'email_verified_at',
        'created_by',
        'updated_by',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at',
        'created_by',
        'updated_by',
    ];

    protected $appends = ['access'];

    #[Override]
    public static function boot(): void
    {
        parent::boot();

        self::creating(function ($model): void {
            $model->business_id = auth()->businessId();
            $model->created_by = auth()->id();
            $model->updated_by = auth()->id();
        });

        self::updating(function ($model): void {
            $model->updated_by = auth()->id();
        });
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function getAccessAttribute(): Collection
    {
        return $this->getAllPermissions();
    }

    public function businesses(): HasMany
    {
        return $this->hasMany(Business::class);
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class, 'business_id');
    }

    public function hasBusiness(): bool
    {
        return $this->business_id !== null;
    }

    public function isBusiness(): bool
    {
        return $this->hasRole(RoleEnum::Business->role());
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id')->select(['id', 'name', 'display_name']);
    }

    public function businessId(): int
    {
        return auth()->user()->key('business_id');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
