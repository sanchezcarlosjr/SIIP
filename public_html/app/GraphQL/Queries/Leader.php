<?php

namespace App\GraphQL\Queries;
use App\Models\Employee;

class Leader
{
    /**
     * @param  null App\Models\AcademicBody $academicBody
     * @param  array<string, mixed>  $args
     */
    public function __invoke($academicBody, array $args)
    {
        return Employee::find($academicBody->lead_employee_id);
    }
}
