<?php

namespace App\GraphQL\Mutations;

use App\Models\AcademicBody;

class RemoveEmployeesToAcademicBody
{
    public function __invoke($_, array $args)
    {
        $args = $args['data'];
        AcademicBody::find($args['academic_body_id'])->employees()->detach($args['employees_id']);
        return AcademicBody::find($args['academic_body_id']);
    }
}
