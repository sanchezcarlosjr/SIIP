<?php

namespace App\GraphQL\Mutations;

use App\Models\AcademicBody;

class RemoveEmployeesToAcademicBody
{
    public function __invoke($_, array $args)
    {
        AcademicBody::find($args['id'])->employees()->detach($args['employees_id']);
        return AcademicBody::find($args['id']);
    }
}
