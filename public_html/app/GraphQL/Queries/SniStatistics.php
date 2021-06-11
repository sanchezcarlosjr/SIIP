<?php


namespace App\GraphQL\Queries;

use App\Models\Sni;

class SniStatistics
{
    public function __invoke($_, array $args)
    {
        /** Get all */
        $model = Sni::getModel();
        if (isset($args["campus"])) {
            $model = $model->campus($args["campus"]);
        }
        if (isset($args["terms"])) {
            $model = $model->terms($args["terms"]);
        }
        $males = $model->getModel()->gender('Hombre')->get()->unique('employee_id')->count();
        $females = $model->gender('Mujer')->get()->unique('employee_id')->count();

        return [
            'periods' => ['2021-2'],
            'datasets' => [
                [
                    'id' => 'M',
                    'label' => 'Mujeres',
                    'data' => [$females],
                    'stack' => 'Sexo',
                ],
                [
                    'id' => 'H',
                    'label' => 'Hombres',
                    'data' => [$males],
                    'stack' => 'Sexo',
                ]
            ]
        ];
    }
}
