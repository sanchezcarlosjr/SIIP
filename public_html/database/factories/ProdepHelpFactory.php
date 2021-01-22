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
            'type' => $this->faker->randomElement($array = array(
                'Apoyo inicial',
                'Apoyo complementario',
                'Apoyo 6 años',
                'Estancias cortas',
                'Apoyo publicación',
                'Convocatoria redes',
                'Convocatoria fortalecimiento',
                'Beca postdoctorado'
            )),
            'date' => $this->faker->date
        ];
    }
}
