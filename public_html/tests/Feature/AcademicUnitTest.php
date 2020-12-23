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
                'promep_key',
                'academic_unit_name',
                'degree_of_consolidation',
                'register_date',
                'next_revision_date',
                'prodep_area_id',
                'leader_id',
                'uabc_area_id',
                'displine_id',
                'des_id',
                'active',
                'created_at',
                'updated_at',
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

    public function testItShouldUpdateAcademicUnit()
    {
        $academic_unit = AcademicUnit::factory()->create();
        $response = $this->putJson("/api/academic-units/{$academic_unit->id}",
            ['leader_id' => 3]
        );
        $response->assertStatus(200);
        $response->assertJsonFragment([
            'leader_id' => 3,
        ]);
    }
    
}
