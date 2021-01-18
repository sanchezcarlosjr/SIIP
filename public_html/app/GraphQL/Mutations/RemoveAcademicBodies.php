<?php

namespace App\GraphQL\Mutations;

use App\Models\AcademicBody;

class RemoveAcademicBodies
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        return AcademicBody::destroy($args['id']);
    }
}
