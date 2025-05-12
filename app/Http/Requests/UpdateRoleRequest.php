<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Enums\PermissionEnum;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

final class UpdateRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (! $this->user()->can(PermissionEnum::RoleUpdate->value)) {
            return false;
        }

        return $this->user()->business_id === $this->role->business_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'permissions' => ['required', 'array', 'exists:permissions,id'],
        ];
    }
}
