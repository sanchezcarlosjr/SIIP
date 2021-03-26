<?php


namespace App\GraphQL\Queries;


use App\Models\AcademicBody;
use App\Models\Employee;
use App\Models\Member;
use App\Models\ProdepProfile;
use App\Models\Sni;

class AcademicBodyStatistics
{
    /**
     * @param $_
     * @param array $args
     */
    public function __invoke($_, array $args)
    {
        $members = Member::count();
        return array(
            'total' => AcademicBody::count(),
            'professorsWithSNIOrProdep' => ProdepProfile::active()->count() + Sni::active()->count(),
            'professorsInAcademicBody' => $members,
            'ptcsAreNotAcademicBody' => abs(Employee::ptcs()->count() - $members),
            'academicBodyByGrade' => $this->countAcademicBodyByGrade()
        );
    }


    private function countAcademicBodyByGrade(): array
    {
        $gradesDatabase = array(
            'En consolidación' => [0],
            'En formación' => [0],
            'Consolidado' => [0]
        );
        $lastEvaluation = new LastEvaluation;
        foreach (AcademicBody::all()->where('active', '==', true) as $academicBody) {
            $evaluation = $lastEvaluation($academicBody);
            if (!is_null($evaluation)) {
                $gradesDatabase[$evaluation->grade][0]++;
            }
        }
        return array(
            'inTraining' => [$gradesDatabase['En formación'][0], 0],
            'inConsolidation' => [$gradesDatabase['En consolidación'][0], 0],
            'consolidated' => [$gradesDatabase['Consolidado'][0], 0]
        );
    }
}
