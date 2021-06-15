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
        $actual = time();
        $datasets = $immutableModel->generateDatasetBy('gender', collect([
                [
                    'id' => "Mujeres-{$actual}",
                    'label' => 'Mujeres',
                    'gender' => 'Mujer',
                    'stack' => 'Sexo'
                ],
                [
                    'id' => "Hombres-{$actual}",
                    'label' => 'Hombres',
                    'gender' => 'Hombre',
                    'stack' => 'Sexo'
                ],
                [
                    'id' => "NA-{$actual}",
                    'label' => 'No especificado',
                    'gender' => 'NA',
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
