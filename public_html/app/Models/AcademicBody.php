<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

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

    public function des() {
      return $this->belongsTo(DES::class, "des_id");
    }

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
        return $this->belongsTo(Employee::class, "lead_employee_id", "nempleado");
    }

    public function collaborators(): BelongsToMany
    {
        return $this->belongsToMany(Employee::class, 'collaborators', 'academic_body_id', 'employee_id');
    }

    public function getGradeAttribute()
    {
        $eval = $this->evaluations->sortBy('finish_date')->get(0);
        return isset($eval->grade) ? $eval->grade_name : null;
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

    public function scopeGrade($query, $grade_names) {
      $grades = [];
      if (in_array("En formación", $grade_names)) {
        $grades[] = 0;
      }
      if (in_array("En consolidación", $grade_names)) {
        $grades[] = 1;
      }
      if (in_array("Consolidado", $grade_names)) {
        $grades[] = 2;
      }
      return $query
        ->joinSub(function($query) use ($grades){
          $query
            ->select("*")
            ->fromSub(function($query) {
              $query
                ->select("*")
                ->from("academic_bodies")
                ->joinSub(function($query) {
                  /** Distinct on Laravel's QueryBuilder doesn't accept parameters */
                  $query->selectRaw("DISTINCT ON (academic_body_id) academic_body_id, grade FROM academic_bodies_evaluations ORDER BY academic_body_id, finish_date DESC");
                },"max_grades", function($join) {
                  $join->on("academic_bodies.id", "=", "max_grades.academic_body_id");
                });
            }, "inner_terms")
            ->where(function($query) use ($grades) {
              for ($i = 0; $i < count($grades); $i++) {
                $query->orWhere("grade", "=", $grades[$i]);
              }
            });
        }, "grade", function($join) {
          $join->on("academic_bodies.id", "=", "grade.id");
        })
        ->select("academic_bodies.*");
    }

    public function scopeCampus($query, $name) {
      return $query
        ->joinSub(function($query) use ($name) {
          $query
            ->select("*")
            ->fromSub(function($query) use ($name) {
              $query
                ->select("academic_bodies.*", "unidades.unidad as unidad")
                ->from("academic_bodies")
                ->leftJoin("empleados", function($join) {
                  $join->on("academic_bodies.lead_employee_id","=","empleados.nempleado");
                })
                ->leftJoin("unidades", function($join) {
                  $join->on("empleados.nunidad","=","unidades.nunidad");
                })
                ->where("campus", "ILIKE", $name);
              }, "inner_terms");
        }, "campus", function($join) {
          $join->on("academic_bodies.id", "=", "campus.id");
        })
        ->select("academic_bodies.*");
    }

    public function scopeValidity($query, $value) {
      if ($value == "Vigente") {
        return $query->where("academic_bodies.active", "=", "t");
      } else if ($value == "No vigente") {
        return $query->where("academic_bodies.active", "=", "f");
      }
    }

    public function scopeTerms($query, $terms) {
      if (empty($terms)) {
        return $query;
      }

      $where = [];
      for ($i = 0; $i < count($terms); $i++) {
        $where[] = array(DB::raw("CONCAT_WS(' ', nombre, grado, prodep_clave, unidad)"), "ILIKE", "%".$terms[$i]."%");
      }

      return $query
        ->joinSub(function($query) use ($where) {
          $query
            ->select("*")
            ->fromSub(function($query) {
              $query
                ->select(
                  "academic_bodies.*",
                  "academic_bodies.name as nombre",
                  "academic_bodies.prodep_key as prodep_clave",
                  "academic_bodies_evaluations.grade as grado",
                  "unidades.unidad")
                ->from("academic_bodies")
                ->leftJoin("academic_bodies_evaluations", function($join) {
                  $join->on("academic_bodies.id","=","academic_bodies_evaluations.academic_body_id");
                })
                ->leftJoin("empleados", function($join) {
                  $join->on("academic_bodies.lead_employee_id","=","empleados.nempleado");
                })
                ->leftJoin("unidades", function($join) {
                  $join->on("empleados.nunidad","=","unidades.nunidad");
                });
            }, "inner_terms")
            ->where(function ($query) use ($where) {
              $query->orWhere($where);
            });
        }, "terms", function ($join) {
          $join->on("academic_bodies.id", "=", "terms.id");
        })
        ->select("academic_bodies.*");
    }
}
