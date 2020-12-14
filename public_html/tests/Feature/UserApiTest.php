<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function testWhenRequestToUsersThenOk()
    {
        $response = $this->get('/api/users');
        $response->assertStatus(200);
    }

    public function testItShouldShowUsers()
    {
        User::factory()->create();
        $response = $this->json('GET', '/api/users');
        $response->assertJsonStructure([
            [
                'id',
                'name',
                'campus',
                'roles' => [
                    'id',
                    'role'
                ],
                'unit',
                'email',
            ]
        ]);
    }

}
