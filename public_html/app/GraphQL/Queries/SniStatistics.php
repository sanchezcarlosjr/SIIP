<?php


namespace App\GraphQL\Queries;

use App\Models\Sni;

class SniStatistics
{
    public function __invoke($_, array $args)
    {
        $immutableModel = new ImmutableModel(Sni::getModel(), collect([
            ["name" => "campus", "arg" => "campus"],
            ["name" => "terms", "arg" => "terms"]
        ]), $args);
        $datasets = $immutableModel->generateDatasetBy('gender', collect([
                [
                    'id' => 'Mujer',
                    'label' => 'Mujeres',
                    'stack' => 'Sexo'
                ],
                [
                    'id' => 'Hombre',
                    'label' => 'Hombres',
                    'stack' => 'Sexo'
                ],
                [
                    'id' => 'NA',
                    'label' => 'No especificado',
                    'stack' => 'Sexo',
                ]
            ]
        ));
        return [
            'periods' => ['2021-2'],
            'datasets' => $datasets
        ];
    }
}
