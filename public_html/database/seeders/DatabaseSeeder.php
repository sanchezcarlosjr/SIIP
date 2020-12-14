<?php

namespace Database\Seeders;

use App\Models\AcademicUnit;
use App\Models\Role;
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
        AcademicUnit::factory()->count(3)->create();
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
                    'email_verified_at' => now(),
                    'role_id' => 1,
                    'campus' => 'Ensenada',
                    'unit' => 'B',
                    'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                    'remember_token' => Str::random(10),
                ],
                [
                    'name' => 'María Victoria Meza Kubo',
                    'email' => 'mmeza@uabc.edu.mx',
                    'email_verified_at' => now(),
                    'role_id' => 2,
                    'campus' => 'Ensenada',
                    'unit' => 'Facultad de ciencias',
                    'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                    'remember_token' => Str::random(10),
                ]
            ]
        );
    }
}
