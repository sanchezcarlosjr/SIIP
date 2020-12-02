<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class UsersTest extends TestCase
{
    public function testWhenNavigateToUsersThenOk()
    {
        $response = $this->get('/users');
        $response->assertStatus(200);
    }
    public function testItShouldCreateAUserSuccessfully()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)
            ->json('POST', '/users', [
                'name' => 'test',
            ]);
        $this->assertDatabaseHas('users', [
            'title' => 'test',
        ]);
    }
    public function testItShouldDeleteAUser()
    {
        $user = User::factory()->create();
        $this->json('DELETE', '/users/1');
        $this->assertDatabaseMissing('users', $response);
    }
}
