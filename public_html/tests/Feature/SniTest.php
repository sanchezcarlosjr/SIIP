<?php


namespace Tests\Feature;

use App\Models\Sni;
use App\Models\Employee;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class SniTest extends TestCase
{
    public function testShouldGetSnisThatMatchingWithMexicali()
    {
        $snis = Sni::campus('Mexicali')->get();
        $campus = $snis->map(function ($sni) {
            return $sni->employee()->get()[0]->academic_unit()->get()[0]->campus;
        });
        $this->assertContains("Mexicali", $campus);
        $this->assertNotContains("Ensenada", $campus);
        $this->assertNotContains("Tijuana", $campus);
    }

    public function testShouldGetSnisCloseToRetirement()
    {
        $snis = Sni::closeToRetirement()->get();
        $snis->map(function ($sni) {
            return $sni->employee()->get()[0]->age;
        })->each(function ($age) {
            $this->assertGreaterThanOrEqual(69, $age);
        });
    }

    public function testShouldGetSnisCloseToExpire()
    {
        $snis = Sni::closeToExpire()->get();
        $snis->map(function ($sni) {
            return $sni->finish_date;
        })->each(function ($finish_date) {
            $diff = Carbon::create($finish_date)->diffInMonths(Carbon::today());
            $this->assertLessThanOrEqual(6, $diff);
        });
    }
    public function testShouldGetMaleSnis() {
        $snis = Sni::gender('Hombre')->get();
        $snis->map(function ($sni) {
            return $sni->employee()->get()[0]->sexo;
        })->each(function ($sexo) {
            $this->assertEquals(Employee::Male, $sexo);
        });
    }
}
