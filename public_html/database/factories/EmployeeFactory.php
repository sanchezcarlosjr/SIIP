<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nempleado' => $this->faker->numberBetween($min = 1000, $max = 10000000),
            'nombre' => $this->faker->userName,
            'apaterno' => $this->faker->lastName,
            'amaterno' => $this->faker->lastName,
            'sexo' => $this->faker->randomElement($array = array ('M', 'F', 'NA')),
            'grado' => $this->faker->randomElement($array = array ('A','B','C', 'D')),
            'nunidad' => $this->faker->randomElement($array = array (114, 122, 123, 175)),
            'f_nacimiento' => $this->faker->date
        ];
    }
}