<?php

namespace App\GraphQL\Queries;

class LastEvaluation
{
    /**
     * @param  \App\Models\AcademicBody  $academicBody
     * @param  array<string, mixed>  $args
     */
    public function __invoke($academicBody, array $args)
    {
        return $academicBody->evaluations->sortBy('finish_date')->get(0);
    }
}
