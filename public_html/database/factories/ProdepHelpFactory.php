<?php

namespace Database\Factories;

use App\Models\ProdepHelp;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProdepHelpFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProdepHelp::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'amount' => $this->faker->randomFloat($nbMaxDecimals = 2, $min = 1000, $max = 100000),
            'type' => $this->faker->numberBetween(0, 4),
            'date' => $this->faker->date
        ];
    }
}
