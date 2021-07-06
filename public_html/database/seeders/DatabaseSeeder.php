<?php

namespace Database\Seeders;

use App\Models\{AcademicUnit, ActivitiesPit, DES, User};
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
        #DES::factory(10)->create();
        #AcademicUnit::factory(100)->create();
        Employee::factory(10)->has(User::factory())->create();
        ProdepArea::factory(200)->create();
        AcademicBody::factory(200)->create();
        Employee::factory(100)->has(LGAC::factory(), 'academic_bodies_lgacs')->create();
        Employee::factory(100)->has(AcademicBody::factory(), 'collaborator_academic_bodies')->create();
        Employee::factory(100)->has(Help::factory()->count(3))->create();
        Employee::factory(10)->has(ProdepProfile::factory()->count(3), 'prodep_profiles')->create();
        Employee::factory(5)->has(ProdepHelp::factory()->count(3), 'prodep_helps')->create();
        Employee::factory(5)->has(ProdepNPTC::factory()->count(3), 'prodep_nptcs')->create();
//        Employee::factory(5)->has(Sni::factory()->count(5), 'snis')->create();
//        Employee::factory(5)->has(Researcher::factory()->count(5), 'researchers')->create();
//        LGAC::factory(200)->create();
//        Evaluation::factory(200)->create();
//        SNIArea::factory(50)->create();
//        Network::factory(200)->create();
//        ActivitiesPit::factory()->create();
    }

    private function makeRoles()
    {
        DB::table('roles')->insert([
            ['rol' => 'Admnistrador'],
            ['rol' => 'Coordinador general'],
            ['rol' => 'Coordinador UA'],
            ['rol' => 'Auxiliar SNI'],
            ['rol' => 'Jefe de investigación'],
            ['rol' => 'Auxiliar PRODEP'],
            ['rol' => 'Auxiliar cuerpos académicos'],
            ['rol' => 'Jefe de Posgrados'],
            ['rol' => 'Auxiliar Posgrados'],
            ['rol' => 'Planeación'],
            ['rol' => 'Secretaría general'],
            ['rol' => 'Responsable de Campus'],
            ['rol' => 'Jefe Propiedad Intelectual y T'],
            ['rol' => 'Responsable de Campus'],
            ['rol' => 'Auxiliar PIT'],
            ['rol' => 'Coordinador de investigación y posgrado de UA']
        ]);
        DB::table('modulos')->insert([
            ['modulo' => '/inicio'],
            ['modulo' => '/usuarios'],
            ['modulo' => '/cuerpos-academicos'],
            ['modulo' => '/cuerpos-academicos/miembros'],
            ['modulo' => '/cuerpos-academicos/lgac'],
            ['modulo' => '/cuerpos-academicos/evaluaciones'],
            ['modulo' => '/cuerpos-academicos/redes'],
            ['modulo' => '/cuerpos-academicos/apoyos'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/editar'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/evaluaciones'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/lgac'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/miembros'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/redes'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/colaboradores'],
            ['modulo' => '/sni'],
            ['modulo' => '/prodep'],
            ['modulo' => '/prodep/apoyos'],
            ['modulo' => '/prodep/nptcs'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/apoyos'],
        ]);
        DB::table('permisos')->insert([
            ['modulo_id' => 1, 'rol_id' => 4, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 3, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 4, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 5, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 6, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 7, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 8, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 9, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 10, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 11, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 12, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 13, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 14, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 15, 'rol_id' => 4, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 16, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 17, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 18, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 19, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 1, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 2, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 3, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 4, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 5, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 6, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 7, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 8, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 9, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 10, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 11, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 12, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 13, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 14, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 15, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 16, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 17, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 18, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 19, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 1, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 2, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 3, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 4, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 5, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 6, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 7, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 8, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 9, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 10, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 11, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 12, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 13, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 14, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 15, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 16, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
        ]);
    }

}
