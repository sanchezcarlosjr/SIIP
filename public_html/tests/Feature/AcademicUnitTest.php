<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\AcademicUnit;

class AcademicUnitTest extends TestCase
{
     public function testWhenRequestToAcademicUnitsThenOk()
    {
        $response = $this->get('/api/academic-units');
        $response->assertStatus(200);
    }

    public function testItShouldShowAcademicUnits()
    {
        $response = $this->json('GET', '/api/academic-units');
        $response->assertJsonStructure([
            [
                'id',
                'promep_key',
                'degree_of_consolidation',
                'leader_name',
                'academic_unit_name',
                'uabc_area',
                'created_at',
                'updated_at'
            ]
        ]);
    }

    public function testItShouldDestroyAcademicUnits()
    {
        $academic_unit = AcademicUnit::factory()->create();
        $response = $this->deleteJson("/api/academic-units/{$academic_unit->id}");
        $response->assertStatus(200);
        $this->assertDeleted($academic_unit);
    }
    
}
