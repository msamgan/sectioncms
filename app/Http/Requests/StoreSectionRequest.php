<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Enums\PermissionEnum;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

final class StoreSectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (! $this->user()->can(PermissionEnum::SectionCreate->value)) {
            return false;
        }

        return (bool) $this->user()->hasBusiness();
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
            'fields' => ['required', 'array'],
            'fields.*.key' => ['required', 'string', 'max:255'],
            'fields.*.value' => ['required', 'array'],
        ];
    }
}
