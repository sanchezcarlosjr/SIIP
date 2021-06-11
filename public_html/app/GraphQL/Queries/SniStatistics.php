<?php


namespace App\GraphQL\Queries;

class SniStatistics
{
    public function __invoke($_, array $args)
    {
        return [
            'periods' => [],
            'postgraduates' => [],
            'undergraduates' => [],
            'women' => [],
            'men' => []
        ];
    }
}
