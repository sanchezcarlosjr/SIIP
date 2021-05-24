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
            'amount' => $this->faker->randomFloat($nbMaxDecimals = NULL, $min = 0, $max = NULL),
            'type' => $this->faker->randomElement($array = array(0,1,2,3,4)),
            'date' => $this->faker->date
        ];
    }
}
