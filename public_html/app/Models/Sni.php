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

    protected $fillable = ["start_date", "finish_date", "discipline", "field", "request", "level", "specialty", "employee_id", "sni_area_id"];
    protected $appends = [
        "is_active"
    ];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    public function scopeTerms($query, $terms)
    {
        if (empty($terms)) {
            return $query;
        }
        $where = [];
        for ($i = 0; $i < count($terms); $i++) {
            $where[] = array(DB::raw("CONCAT_WS(' ', start_date, finish_date, discipline, field, request, level, specialty, employee_id)"), "ILIKE", "%" . $terms[$i] . "%");
        }
        return $query->where(function ($query) use ($where) {
            $query->orWhere($where);
        });
    }

    public function scopeCampus(Builder $query, string $campus): Builder
    {
        $employees = Employee::campus($campus);
        return $query->joinSub($employees, 'employee', function ($join) {
            $join->on('snis.employee_id', '=', 'employee.nempleado');
        });
    }

    public function scopeCloseToRetirement(Builder $query): Builder
    {
        $employees = Employee::closeToRetirement();
        return $query->joinSub($employees, 'employee', function ($join) {
            $join->on('snis.employee_id', '=', 'employee.nempleado');
        });
    }

    public function scopeCloseToExpire(Builder $query): Builder
    {
        $timeToExpireInMonths = 6;
        $expirationDate = Carbon::today()->addMonths($timeToExpireInMonths)->toDateString();
        $today = Carbon::today()->toDateString();
        return $query->whereBetween('finish_date', [$today, $expirationDate]);
    }

    public function scopeGender(Builder $query, string $gender)
    {
        $employees = Employee::gender($gender);
        return $query->joinSub($employees, 'employee', function ($join) {
            $join->on('snis.employee_id', '=', 'employee.nempleado');
        });
    }

    public function getIsActiveAttribute()
    {
        return Carbon::today()->lessThan($this->finish_date);
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
