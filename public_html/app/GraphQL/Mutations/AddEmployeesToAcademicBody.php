<?php

namespace App\GraphQL\Mutations;

use App\Models\AcademicBody;
use App\Models\LGAC;

class AddEmployeesToAcademicBody
{
    public function __invoke($_, array $args)
    {
        LGAC::find($args['lgac_id'])->employees()->attach($args['employees_id']);
        return AcademicBody::find($args['academic_body_id']);
    }
}
