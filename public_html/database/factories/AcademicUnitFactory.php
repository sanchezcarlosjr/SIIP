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
                'promep_key' => 'UABC-CA-281',
                'academic_unit_name' =>  'ARTE, TECNOLOGÍA Y SOCIEDAD CONTEMPORÁNEA',
                'degree_of_consolidation' => 'EN FORMACIÓN',
                'register_date' => '11/7/2016',
                'next_revision_date' => '11/25/2022',
                'prodep_area_id' => 2,
                'leader_id' => 3,
                'uabc_area_id' => 4,
                'displine_id' => 1,
                'des_id' => 5,
                'active' => true,
                'created_at' => '10/22/2020',
                'updated_at' => '12/22/2020'
        ];
    }
}
