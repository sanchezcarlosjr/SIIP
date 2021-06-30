<?php

namespace Database\Seeders;

use App\Models\{ActivitiesPit, User};
use App\Models\AcademicBody;
use App\Models\Employee;
use App\Models\Evaluation;
use App\Models\Help;
use App\Models\LGAC;
use App\Models\Network;
use App\Models\ProdepArea;
use App\Models\ProdepHelp;
use App\Models\ProdepNPTC;
use App\Models\ProdepProfile;
use App\Models\Researcher;
use App\Models\Sni;
use App\Models\SNIArea;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


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
        Employee::factory(10)->has(User::factory())->create();
        # DES::factory(10)->create();
        # AcademicUnit::factory(100)->create();
        ProdepArea::factory(200)->create();
        AcademicBody::factory(200)->create();
        Employee::factory(100)->has(LGAC::factory(), 'academic_bodies_lgacs')->create();
        Employee::factory(100)->has(AcademicBody::factory(), 'collaborator_academic_bodies')->create();
        Employee::factory(100)->has(Help::factory()->count(3))->create();
        Employee::factory(10)->has(ProdepProfile::factory()->count(3), 'prodep_profiles')->create();
        Employee::factory(5)->has(ProdepHelp::factory()->count(3), 'prodep_helps')->create();
        Employee::factory(5)->has(ProdepNPTC::factory()->count(3), 'prodep_nptcs')->create();
        Employee::factory(5)->has(Sni::factory()->count(5), 'snis')->create();
        Employee::factory(5)->has(Researcher::factory()->count(5), 'researchers')->create();
        LGAC::factory(200)->create();
        Evaluation::factory(200)->create();
        SNIArea::factory(50)->create();
        Network::factory(200)->create();
        ActivitiesPit::factory()->create();
    }

    private function makeRoles()
    {
        DB::table('roles')->insert([
            ['role' => 'Admnistrador'],
            ['role' => 'Coordinador general'],
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
        DB::table('modulos')->insert([
            ['module' => '/inicio'],
            ['module' => '/usuarios'],
            ['module' => '/cuerpos-academicos'],
            ['module' => '/cuerpos-academicos/miembros'],
            ['module' => '/cuerpos-academicos/lgac'],
            ['module' => '/cuerpos-academicos/evaluaciones'],
            ['module' => '/cuerpos-academicos/redes'],
            ['module' => '/cuerpos-academicos/apoyos'],
            ['module' => '/cuerpos-academicos/:academic_body_id/editar'],
            ['module' => '/cuerpos-academicos/:academic_body_id/evaluaciones'],
            ['module' => '/cuerpos-academicos/:academic_body_id/lgac'],
            ['module' => '/cuerpos-academicos/:academic_body_id/miembros'],
            ['module' => '/cuerpos-academicos/:academic_body_id/redes'],
            ['module' => '/cuerpos-academicos/:academic_body_id/colaboradores'],
            ['module' => '/sni'],
            ['module' => '/prodep'],
            ['module' => '/prodep/apoyos'],
            ['module' => '/prodep/nptcs']
        ]);
        DB::table('permisos')->insert([
            ['modulo_id' => 1, 'rol_id' => 4, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 3, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 4, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 5, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 6, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 7, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 8, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 9, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 10, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 11, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 12, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 13, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 14, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 15, 'rol_id' => 4, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 16, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 17, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 18, 'rol_id' => 4, 'create' => false, 'edit' => false, 'read' => true, 'destroy' => false],
            ['modulo_id' => 1, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 2, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 3, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 4, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 5, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 6, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 7, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 8, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 9, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 10, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 11, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 12, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 13, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 14, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 15, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 16, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 17, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 18, 'rol_id' => 1, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 1, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 2, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 3, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 4, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 5, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 6, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 7, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 8, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 9, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 10, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 11, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 12, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 13, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 14, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 15, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
            ['modulo_id' => 16, 'rol_id' => 2, 'create' => true, 'edit' => true, 'read' => true, 'destroy' => true],
        ]);
    }

}
