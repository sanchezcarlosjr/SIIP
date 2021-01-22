<?php

namespace Database\Factories;

use App\Models\Sni;
use Illuminate\Database\Eloquent\Factories\Factory;

class SniFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Sni::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "start_date" => $this->faker->date,
            "finish_date" => $this->faker->date,
            "discipline" => $this->faker->name,
            "field" => $this->faker->name,
            "request" => $this->faker->name,
            "level" => $this->faker->name,
            "specialty" => $this->faker->date,
            "sni_area_id" => $this->faker->numberBetween($min = 1, $max = 10),
        ];
    }
}
