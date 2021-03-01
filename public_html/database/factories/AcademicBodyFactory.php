<?php

namespace Database\Factories;

use App\Models\AcademicBody;
use Illuminate\Database\Eloquent\Factories\Factory;

class AcademicBodyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AcademicBody::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'prodep_key' => $this->faker->city,
            'active' => rand(0, 1) == 1,
            'prodep_area_id' => $this->faker->numberBetween($min = 1, $max = 10),
            'discipline' => $this->faker->word,
            'des_id' => $this->faker->numberBetween($min = 1, $max = 5),
        ];
    }
}
