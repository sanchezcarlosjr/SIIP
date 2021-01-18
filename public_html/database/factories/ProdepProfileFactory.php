<?php

namespace Database\Factories;

use App\Models\ProdepProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProdepProfileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProdepProfile::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'start_date' => $this->faker->date,
            'finish_date' => $this->faker->date,
            'prodep_area_id' => $this->faker->numberBetween($min=1, $max=6)
        ];
    }
}
