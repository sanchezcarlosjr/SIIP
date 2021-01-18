<?php

namespace App\GraphQL\Mutations;
use App\Models\Evaluation;

class UpdateEvaluation
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        Evaluation::find($args['id'])->update($args);
        return Evaluation::find($args['id']);
    }
}
