<?php

namespace App\GraphQL\Mutations;

use App\Models\Employee;

class RemoveEmployeesToAcademicBody
{
    public function __invoke($_, array $args)
    {
        return Employee::find($args['employee_id'])
            ->academic_bodies_lgacs()
            ->get()
            ->where('academic_body_id', $args['academic_body_id'])
            ->first()
            ->detach($args['employee_id'])
            ->employees()
            ->detach();
    }
}
