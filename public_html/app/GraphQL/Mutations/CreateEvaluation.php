<?php

namespace App\GraphQL\Mutations;
use App\Models\Evaluation;

class CreateEvaluation
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        return Evaluation::create($args);
    }
}
