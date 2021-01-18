<?php

namespace App\GraphQL\Mutations;

use App\Models\AcademicBody;

class CreateAcademicBodies
{
    public function __invoke($_, array $args)
    {
        return AcademicBody::create($args);
    }
}
