<?php


namespace App\GraphQL\Queries;

class SniStatistics
{
    public function __invoke($_, array $args)
    {
        return [
            'periods' => ['2021-1', '2021-2'],
            'datasets' => [
                [
                    'id' => 'M',
                    'label' => 'Mujeres',
                    'data' => [10,5],
                    'stack' => 'Sexo',
                ],
                [
                    'id' => 'H',
                    'label' => 'Hombres',
                    'data' => [15,5],
                    'stack' => 'Sexo',
                ],
                [
                    'id' => 'L',
                    'label' => 'Licenciaturas',
                    'data' => [12,8],
                    'stack' => 'Grado',
                ],
                [
                    'id' => 'L',
                    'label' => 'Licenciaturas',
                    'data' => [12,8],
                    'stack' => 'Grado',
                ]
            ]
        ];
    }
}
