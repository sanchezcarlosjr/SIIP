<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Sni extends Model
{
    use HasFactory;
    use ActiveEmployee;

    protected $fillable = ["fecha_inicio", "fecha_fin", "disciplina", "campo", "nivel", "especialidad", "nempleado", "nombramiento", "area_sni_id"];
    protected $appends = [
        "is_active"
    ];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    public function scopeTerms(Builder $query, $terms)
    {
        if (empty($terms)) {
            return $query;
        }
        $query->joinSub(Employee::terms($terms), 'employee', function ($join) {
            $join->on('snis.employee_id', '=', 'employee.nempleado');
        });
        return $query;
    }

    public function scopeCampus(Builder $query, string $campus): Builder
    {
        $employees = Employee::campus($campus);
        return $query->joinSub($employees, 'employeeCampus', function ($join) {
            $join->on('snis.employee_id', '=', 'employeeCampus.nempleado');
        });
    }

    public function scopeCloseToRetirement(Builder $query): Builder
    {
        $employees = Employee::closeToRetirement();
        return $query->joinSub($employees, 'employeeClosesToRetirement', function ($join) {
            $join->on('snis.employee_id', '=', 'employeeClosesToRetirement.nempleado');
        });
    }

    public function scopeCloseToExpire(Builder $query): Builder
    {
        $timeToExpireInMonths = 6;
        $expirationDate = Carbon::today()->addMonths($timeToExpireInMonths)->toDateString();
        $today = Carbon::today()->toDateString();
        return $query->whereBetween('fecha_fin', [$today, $expirationDate]);
    }

    public function scopeGender(Builder $query, string $gender)
    {
        $employees = Employee::gender($gender);
        return $query->joinSub($employees, 'employeeByGender', function ($join) {
            $join->on('snis.employee_id', '=', 'employeeByGender.nempleado');
        });
    }

    public function getIsActiveAttribute()
    {
        return Carbon::today()->lessThan($this->fecha_fin);
    }

    public function sni_area()
    {
        return $this->belongsTo(SNIArea::class, "sni_area_id");
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, "employee_id");
    }

    public function generateURL()
    {
        return "public/archivos/snis/" . $this->id . "/" . Str::random(40);
    }

}
