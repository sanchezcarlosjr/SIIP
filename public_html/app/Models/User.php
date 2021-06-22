<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'role_id',
        'employee_id'
    ];
    protected $hidden = [
        'remember_token',
        'created_at',
        'updated_at',
        'email_verified_at'
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function roles()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function scopeCampus(Builder $query, string $campus): Builder
    {
        return $query->joinSub(Employee::campus($campus), 'employeeCampus', function ($join) {
            $join->on('users.employee_id', '=', 'employeeCampus.nempleado');
        });
    }

    public function scopeGender(Builder $query, string $gender): Builder
    {
        return $query->joinSub(Employee::gender($gender), 'employeeGender', function ($join) {
            $join->on('users.employee_id', '=', 'employeeGender.nempleado');
        });
    }

    public function scopeTerms(Builder $query, $terms): Builder
    {
        if (empty($terms)) {
            return $query;
        }
        return $query->joinSub(Employee::terms($terms), 'employee', function ($join) {
            $join->on('users.employee_id', '=', 'employee.nempleado');
        });
    }

}
