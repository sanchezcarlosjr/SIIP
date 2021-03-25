<?php


namespace App\GraphQL\Queries;


use App\Models\AcademicBody;

class AcademicBodyStatistics
{
    /**
     * @param $_
     * @param array $args
     */
    public function __invoke($_, array $args)
    {
        return array(
            'total' => AcademicBody::count(),
            'professorsWithSNIOrProdep' => 2,
            'professorsInAcademicBody' => 10,
            'ptcsAreNotAcademicBody' => 1,
            'academicBodyByGrade' => array(
                'inTraining' => [20, 20],
                'inConsolidation' => [20, 20],
                'consolidated' => [20, 20]
            )
        );
    }
}
