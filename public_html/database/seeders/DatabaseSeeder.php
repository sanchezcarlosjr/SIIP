<?php

namespace Database\Seeders;

use App\Models\AcademicBody;
use App\Models\Discipline;
use App\Models\Employee;
use App\Models\Evaluation;
use App\Models\Help;
use App\Models\LGAC;
use App\Models\Network;
use App\Models\ProdepArea;
use App\Models\ProdepHelp;
use App\Models\ProdepProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->makeRoles();
        $this->makeUsers();
        ProdepArea::factory(200)->create();
        Discipline::factory(200)->create();
        Employee::factory(100)->has(AcademicBody::factory()->state(function (array $attributes, Employee $employee) {
            return ['lead_employee_id' => $employee->nempleado];
        }), 'academic_bodies')->create();
        Employee::factory(100)->has(Help::factory()->count(3))->create();
        Employee::factory(10)->has(ProdepProfile::factory()->count(3), 'prodep_profiles')->create();
        Employee::factory(5)->has(ProdepHelp::factory()->count(3), 'prodep_helps')->create();
        LGAC::factory(200)->create();
        Evaluation::factory(200)->create();
        Network::factory(200)->create();
    }

    private function makeRoles()
    {
        DB::table('roles')->insert([
            ['role' => 'Coordinador general'],
            ['role' => 'Admnistrador'],
            ['role' => 'Coordinador UA'],
            ['role' => 'Auxiliar SNI'],
            ['role' => 'Jefe de investigación'],
            ['role' => 'Auxiliar PRODEP'],
            ['role' => 'Auxiliar cuerpos académicos'],
            ['role' => 'Jefe de Posgrados'],
            ['role' => 'Auxiliar Posgrados'],
            ['role' => 'Planeación'],
            ['role' => 'Secretaría general'],
            ['role' => 'Responsable de Campus'],
            ['role' => 'Jefe Propiedad Intelectual y T'],
            ['role' => 'Responsable de Campus'],
            ['role' => 'Auxiliar PIT'],
            ['role' => 'Coordinador de investigación y posgrado de UA']
        ]);
    }

    private function makeUsers()
    {
        DB::table('users')->insert([
                [
                    'name' => 'Juan Guillermo Vaca Rodríguez',
                    'email' => 'juangvaca@uabc.edu.mx',
                    'role_id' => 1,
                    'campus' => 'Ensenada',
                    'unit' => 'NA',
                    'remember_token' => Str::random(10),
                ],
                [
                    'name' => 'María Victoria Meza Kubo',
                    'email' => 'mmeza@uabc.edu.mx',
                    'role_id' => 2,
                    'campus' => 'Ensenada',
                    'unit' => 'Facultad de ciencias',
                    'remember_token' => Str::random(10),
                ]
            ]
        );
    }
}
