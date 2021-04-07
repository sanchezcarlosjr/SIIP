<?php

namespace App\GraphQL\Mutations;

use App\Models\AcademicBody;
use App\Models\Employee;
use App\Models\LGAC;
use App\Models\Member;
use Error;

class AddEmployeesToAcademicBody
{
    public function __invoke($_, array $args)
    {
        if (!$args['lgac_id']) {
            throw new Error('Datos incompletos: LGAC.', '402');
        }
        if (!$args['employees_id']) {
            throw new Error('Datos incompletos: Empleado.', '402');
        }
        $employeeLgac = Employee::find($args['employees_id'])->academic_bodies_lgacs()->first();
        $lgac = LGAC::find($args['lgac_id']);
        if ($lgac != null && $employeeLgac != null && $employeeLgac->academic_body_id != $lgac->academic_body_id) {
            throw new Error('El empleado solo puede pertenecer a una cuerpo académico.', '402');
        }
        Member::firstOrCreate([
            'academic_bodies_lgacs_id' => $args['lgac_id'],
            'employee_id' => $args['employees_id'],
        ]);
        return AcademicBody::find($args['academic_body_id']);
    }
}
