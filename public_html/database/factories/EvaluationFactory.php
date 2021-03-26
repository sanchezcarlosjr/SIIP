<?php

namespace Database\Factories;

use App\Models\Evaluation;
use Illuminate\Database\Eloquent\Factories\Factory;

class EvaluationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string

     */
    protected $model = Evaluation::class;

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
            'grade' => $this->faker->randomElement($array = array('Consolidado', 'Consolidación', 'Formación')),
            'academic_body_id' => $this->faker->numberBetween($min = 1, $max = 100)
        ];
    }
}
