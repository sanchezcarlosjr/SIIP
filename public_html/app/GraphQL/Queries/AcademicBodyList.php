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
        $lgacs = $employee->academic_bodies_lgacs()->first();
        if ($lgacs == null) {
            return "";
        }
        return $employee->academic_bodies_lgacs()->first()->academic_body()->get()->name;
    }
}
