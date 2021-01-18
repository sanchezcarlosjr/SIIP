<?php

namespace App\GraphQL\Mutations;

use App\Models\AcademicBody;

class AddEmployeesToAcademicBody
{
    public function __invoke($_, array $args)
    {
        AcademicBody::find($args['id'])->employees()->attach($args['employees_id']);
        return AcademicBody::find($args['id']);
    }
}
