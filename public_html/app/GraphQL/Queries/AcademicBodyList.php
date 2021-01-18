<?php

namespace App\GraphQL\Queries;

use App\Models\Employee;

class AcademicBodyList
{
    /**
     * @param Employee $employee
     * @param array $args
     */
    public function __invoke(Employee $employee, array $args)
    {
        return $employee->academic_bodies()->get()->implode('name', ",");
    }
}
