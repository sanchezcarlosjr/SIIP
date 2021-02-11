<?php

namespace App\GraphQL\Mutations;

use App\Models\AcademicBody;

class CreateAcademicBodies
{
    public function __invoke($_, array $args)
    {
        $args = $args['data'];
        return AcademicBody::create($args);
    }
}
