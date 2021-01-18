<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Help;
use Illuminate\Database\Eloquent\Factories\Factory;

class HelpFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Help::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'amount' =>$this->faker->numberBetween($min = 1000, $max = 10000000),
            'type' => $this->faker->userName,
            'date' => $this->faker->date,
            'academic_body_id' => $this->faker->numberBetween($min = 1, $max = 10)
        ];
    }
}
