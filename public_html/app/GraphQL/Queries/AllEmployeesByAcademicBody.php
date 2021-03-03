<?php

namespace App\GraphQL\Queries;

use App\Models\AcademicBody;
use App\Models\LGAC;

class AllEmployeesByAcademicBody
{
    /**
     * @param AcademicBody $academicBody
     * @param array<string, mixed> $args
     */
    public function __invoke(AcademicBody $academicBody, array $args)
    {
        if ($academicBody->lgacs()->getResults()->isEmpty()) {
            return [];
        }
        return $academicBody->lgacs()->getResults()->map(function (LGAC $lgac) {
            return $lgac->employees()->get();
        })->flatMap(function ($values) {
            return $values;
        });
    }
}
