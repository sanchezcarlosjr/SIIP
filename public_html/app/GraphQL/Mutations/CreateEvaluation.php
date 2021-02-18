<?php

namespace App\GraphQL\Mutations;
use App\Models\Evaluation;

class CreateEvaluation
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        $args['finish_date'] = $args['start_date']->copy()->addYear($args['years_to_finish']);
        return Evaluation::create($args);
    }
}
