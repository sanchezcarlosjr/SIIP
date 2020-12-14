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
            'ClavePROMEP' => $this->faker->company
        ];
    }
}
