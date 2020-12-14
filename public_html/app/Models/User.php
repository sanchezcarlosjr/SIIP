<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    protected $fillable = [
        'name',
        'role_id',
        'unit',
        'campus',
        'email',
        'id',
        'password',
    ];
    protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at',
        'email_verified_at'
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function roles() {
        return $this->belongsTo(Role::class, 'role_id');
    }
}
