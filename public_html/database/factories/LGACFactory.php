<?php

namespace Database\Factories;

use App\Models\LGAC;
use App\Models\AcademicUnit;
use Illuminate\Database\Eloquent\Factories\Factory;

class LGACFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = LGAC::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'key' => $this->faker->uuid,
            'name' => $this->faker->name,
            'description' => $this->faker->word,
            'active' => rand(0,1) == 1,
            'academic_body_id' => $this->faker->numberBetween($min = 1, $max = 10)
        ];
    }
}