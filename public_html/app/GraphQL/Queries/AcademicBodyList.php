<?php

namespace App\GraphQL\Queries;

use App\Models\Employee;
use App\Models\LGAC;

class AcademicBodyList
{
    /**
     * @param Employee $employee
     * @param array $args
     */
    public function __invoke(Employee $employee, array $args)
    {
        $academic_bodies = $employee
            ->academic_bodies_lgacs()
            ->getResults()
            ->map(function (LGAC $lgac) {
                return $lgac->academic_body()->first()->name;
            });
        return $academic_bodies->implode(' ');
    }
}
