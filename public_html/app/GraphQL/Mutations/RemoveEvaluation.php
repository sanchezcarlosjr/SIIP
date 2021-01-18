<?php

namespace App\GraphQL\Mutations;
use App\Models\Evaluation;

class RemoveEvaluation
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        return Evaluation::destroy($args['id']);
    }
}
