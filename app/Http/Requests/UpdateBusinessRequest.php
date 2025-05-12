<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Enums\PermissionEnum;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

final class UpdateBusinessRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (! $this->user()->can(PermissionEnum::BusinessUpdate->value)) {
            return false;
        }

        return $this->user()->business_id === $this->business->id;
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
            'address' => ['string', 'max:255', 'nullable'],
            'country' => ['required', 'string', 'max:255', 'nullable'],
            'city' => ['string', 'max:255', 'nullable'],
            'state' => ['string', 'max:255', 'nullable'],
            'zip' => ['numeric', 'nullable'],
            'timezone' => ['required', 'string', 'max:255'],
            'unit_system' => ['required', 'string', 'max:255'],
            'weight_unit' => ['required', 'string', 'max:255'],
            'currency' => ['required', 'string', 'max:255'],
        ];
    }
}
