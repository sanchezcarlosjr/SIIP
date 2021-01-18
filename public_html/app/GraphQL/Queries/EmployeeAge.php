<?php

namespace App\GraphQL\Queries;

use App\Models\Employee;
use Illuminate\Support\Carbon;

class EmployeeAge
{
    /**
     * @param Employee $employee
     * @param array<string, mixed> $args
     * @return int
     */
    public function __invoke(Employee $employee, array $args)
    {
        $birthday = Carbon::parse($employee->f_nacimiento);
        return Carbon::today()->diffInYears($birthday);
    }
}
