<?php


namespace Tests\Feature;

use App\Models\Employee;
use App\Models\Sni;
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
}
