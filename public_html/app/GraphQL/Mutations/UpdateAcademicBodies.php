<?php

namespace App\GraphQL\Mutations;

use App\Models\AcademicBody;

class UpdateAcademicBodies
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        AcademicBody::find($args['id'])->update($args);
        return AcademicBody::find($args['id']);
    }
}
