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
        $response = $this->get('/api/academic-bodies');
        $response->assertStatus(200);
    }

    public function testItShouldShowAcademicUnits()
    {
        $response = $this->json('GET', '/api/academic-bodies');
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
        $response = $this->deleteJson("/api/academic-bodies/{$academic_unit->id}");
        $response->assertStatus(200);
        $this->assertDeleted($academic_unit);
    }

    public function testItShouldStoreAcademicUnit()
    {
        $row =  [
                'promep_key' => 'UABC-CA-281',
                'academic_unit_name' =>  'ARTE, TECNOLOGÍA Y SOCIEDAD CONTEMPORÁNEA',
                'register_date' => '11/7/2016',
                'prodep_area_id' => 2,
                'leader_id' => 3,
                'uabc_area_id' => 4,
                'displine_id' => 1,
                'des_id' => 5,
                'active' => true
        ];
        $response = $this->postJson('/api/academic-bodies/', $row);
        $response
            ->assertStatus(201)
            ->assertJsonFragment($row);
    }

    public function testItShouldUpdateAcademicUnit()
    {
        $academic_unit = AcademicUnit::factory()->create();
        $response = $this->putJson("/api/academic-bodies/{$academic_unit->id}",
            ['leader_id' => 3]
        );
        $response->assertStatus(200);
        $response->assertJsonFragment([
            'leader_id' => 3,
        ]);
    }

}
