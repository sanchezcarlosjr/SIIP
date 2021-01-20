<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Employee extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'nempleado';
    protected $table = 'empleados';
    use HasFactory;

    public function academic_bodies(): BelongsToMany
    {
        return $this->belongsToMany(
            AcademicBody::class,
            'academic_body_member',
            'employee_id'
        );
    }

    public function academic_unit()
    {
        return $this->belongsTo(AcademicUnit::class, 'nunidad');
    }

    public function helps()
    {
        return $this->hasMany(Help::class, 'benefited_employee_id');
    }
    public function prodep_profiles()
    {
        return $this->hasMany(ProdepProfile::class, 'employee_id');
    }
}