<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Sni;
use Carbon\Carbon;
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
            "finish_date" => Carbon::instance($this->faker->dateTimeBetween($startDate = '31-12-2019', $endDate = '31-12-2024'))->toDateString(),
            "discipline" => $this->faker->name,
            "field" => $this->faker->name,
            "request" => $this->faker->name,
            'level' => $this->faker->randomElement($array = array("Candidato", "Nivel 1", "Nivel 2", "Nivel 3", "Emérito")),
            "specialty" => $this->faker->name,
            "sni_area_id" => $this->faker->numberBetween($min = 1, $max = 10),
        ];
    }
}
