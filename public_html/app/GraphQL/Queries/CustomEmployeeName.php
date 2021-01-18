<?php

namespace App\GraphQL\Queries;

class CustomEmployeeName
{
   /**
     * @param  null App\Models\Employee $employee
     * @param  array<string, mixed>  $args
     */
    public function __invoke($employee, array $args)
    {
        return "{$employee->nombre} {$employee->apaterno} {$employee->amaterno}";
    }
}
