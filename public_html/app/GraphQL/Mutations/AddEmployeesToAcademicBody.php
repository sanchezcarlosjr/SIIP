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
        foreach ($args['lgac_id'] as $lgac_id) {
            $lgac = LGAC::find($lgac_id);
            if ($lgac != null && $employeeLgac != null && $employeeLgac->academic_body_id != $lgac->academic_body_id) {
                throw new Error('El empleado solo puede pertenecer a una cuerpo académico.', '402');
            }
            Member::firstOrCreate([
                'academic_bodies_lgacs_id' => $lgac_id,
                'employee_id' => $args['employees_id'],
            ]);
        }
        $academicBody = AcademicBody::find($args['academic_body_id']);
        if ($args['is_leader']) {
            $academicBody->lead_employee_id = $args['is_leader'] ? $args['employees_id'] : null;
            $academicBody->save();
        }
        return $academicBody;
    }
}
