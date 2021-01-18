<?php

namespace App\GraphQL\Mutations;
use App\Models\LGAC;

class UpdateLgacs
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($root, array $args)
    {
        LGAC::find($args['id'])->update(['academic_unit_id' => $args['ncuerpo_academico']]);
        return LGAC::find($args['id']);
    }
}
