<?php

namespace Database\Factories;

use App\Models\AcademicUnit;
use Illuminate\Database\Eloquent\Factories\Factory;

class AcademicUnitFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AcademicUnit::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'promep_key' => $this->faker->company,
            'degree_of_consolidation' => $this->faker->name,
            'leader_name' => $this->faker->name,
            'academic_unit_name' => $this->faker->name,
            'uabc_area' => $this->faker->city
        ];
    }
}
