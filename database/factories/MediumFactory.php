<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medium>
 */
final class MediumFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'model_type' => \App\Models\User::class,
            'uuid' => $this->faker->uuid(),
            'collection_name' => COLLECTION_NAME,
            'name' => $this->faker->word(),
            'file_name' => $this->faker->word() . '.jpg',
            'mime_type' => 'image/jpeg',
            'disk' => 'public',
            'size' => $this->faker->numberBetween(1000, 10000000),
            'manipulations' => json_encode([]),
            'generated_conversions' => json_encode([]),
            'responsive_images' => json_encode([]),
        ];
    }
}
