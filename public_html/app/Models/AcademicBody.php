<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

class AcademicBody extends Model
{
    use HasFactory;

    protected $table = 'academic_bodies';
    protected $fillable = [
        'name',
        'prodep_key',
        'active',
        'prodep_area_id',
        'lead_employee_id',
        'discipline',
        'des_id',
        'created_at'
    ];
    protected $appends = [
        "grade",
        "employees",
        "last_evaluation"
    ];

    public function lgacs()
    {
        return $this->hasMany(LGAC::class);
    }

    public function networks()
    {
        return $this->hasMany(Network::class);
    }

    public function helps()
    {
        return $this->hasMany(Help::class);
    }

    public function evaluations(): HasMany
    {
        return $this->hasMany(Evaluation::class)->orderBy('finish_date', 'desc');
    }

    public function prodep_area()
    {
        return $this->belongsTo(ProdepArea::class);
    }

    public function leader()
    {
        return $this->hasOne(Employee::class, "nempleado", "lead_employee_id");
    }

    public function collaborators(): BelongsToMany
    {
        return $this->belongsToMany(Employee::class, 'collaborators', 'academic_body_id', 'employee_id');
    }

    public function getGradeAttribute()
    {
        $eval = $this->evaluations->sortBy('finish_date')->get(0);
        return isset($eval->grade) ? $eval->grade : null;
    }

    public function getEmployeesAttribute()
    {
        $lgacs = $this->lgacs;
        $employees = new Collection();
        foreach ($lgacs as $lgac) {
            $employees = $employees->merge($lgac->employees);
        }
        return $employees->unique('nempleado');
    }

    public function getLastEvaluationAttribute()
    {
        return $this->evaluations->sortBy('finish_date')->get(0);
    }
}
