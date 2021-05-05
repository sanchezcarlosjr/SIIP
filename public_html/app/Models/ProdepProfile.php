<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;


class ProdepProfile extends Model
{
    use HasFactory;
    use ActiveEmployee;

    protected $fillable = [
      "start_date",
      "years_to_finish",
      "employee_id",
      "prodep_area_id"
    ];
    protected $appends = [
      "is_active"
    ];

    public function getIsActiveAttribute() {
      return Carbon::today()->lessThan($this->finish_date);
    }

    public function prodep_area()
    {
        return $this->belongsTo(ProdepArea::class, "prodep_area_id");
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, "employee_id");
    }

    public function getYearsToFinishAttribute() {
      if(isset($this->finish_date)) {
        return Carbon::parse($this->finish_date)->diffInYears(Carbon::parse($this->start_date));
      } else {
        return -1;
      }
    }

    public function setYearsToFinishAttribute($years) {
      $this->attributes["finish_date"] = Carbon::parse($this->start_date)->addYears($years);
    }

    public function scopeMostRecent($query) {
      return $query->orderBy("start_date", "DESC");
    }

    public function scopeAcademicUnit($query, $name) {
      return $query
        ->joinSub(function($query) use ($name) {
          $query
            ->select("*")
            ->fromSub(function($query) use ($name) {
              $query
                ->select("prodep_profiles.*", "unidades.unidad as unidad")
                ->from("prodep_profiles")
                ->join("empleados", function($join) {
                  $join->on("prodep_profiles.employee_id","=","empleados.nempleado");
                })
                ->join("unidades", function($join) {
                  $join->on("empleados.nunidad","=","unidades.nunidad");
                })
                ->where("unidad", "=", $name);
              }, "inner_terms");
        }, "academic_unit", function($join) {
          $join->on("prodep_profiles.id", "=", "academic_unit.id");
        })
        ->select("prodep_profiles.*");
    }

    public function scopeTerms($query, $terms) {
      if (empty($terms)) {
        return $query;
      }

      $where = [];
      for ($i = 0; $i < count($terms); $i++) {
        $where[] = array(DB::raw("CONCAT_WS(nombre, apaterno, amaterno, employee_id, unidad, start_date, finish_date)"), "ILIKE", "%".$terms[$i]."%");
      }


      return $query
        ->joinSub(function($query) use ($where) {
          $query
            ->select("*")
            ->fromSub(function($query) {
              $query
                ->select(
                  "prodep_profiles.*",
                  "prodep_areas.name as prodep_area",
                  "unidades.unidad",
                  "empleados.nombre",
                  "empleados.apaterno",
                  "empleados.amaterno")
                ->from("prodep_profiles")
                ->join("prodep_areas", function($join) {
                  $join->on("prodep_profiles.prodep_area_id","=","prodep_areas.id");
                })
                ->join("empleados", function($join) {
                  $join->on("prodep_profiles.employee_id","=","empleados.nempleado");
                })
                ->join("unidades", function($join) {
                  $join->on("empleados.nunidad","=","unidades.nunidad");
                });
            }, "inner_terms")
            ->where(function ($query) use ($where) {
              $query->orWhere($where);
            });
        }, "terms", function ($join) {
          $join->on("prodep_profiles.id", "=", "terms.id");
        })
        ->select("prodep_profiles.*");
    }
}
