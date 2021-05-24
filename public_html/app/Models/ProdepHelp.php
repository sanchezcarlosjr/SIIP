<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProdepHelp extends Model
{
    use HasFactory;

    protected $fillable = ["amount", "type", "date", "employee_id"];

    public function employee()
    {
        return $this->belongsTo(Employee::class, "employee_id");
    }

    /*public function setTypeAttribute($value) {
      if (is_int($value)) {
        $this->attributes["type"] = $value;
      }
    }*/

    public function getTypeNameAttribute() {
      switch($this->type) {
        case 0: return "Apoyo inicial";
        case 1: return "Apoyo complementario";
        case 2: return "Apoyo 6 años";
        case 3: return "Estancias cortas";
        case 4: return "Apoyo publicación";
      }
    }

    public function scopeCloseToRetirement($query) {
      return $query
        ->joinSub(function($query){
          $query
            ->select("*")
            ->fromSub(function($query){
              $query
                ->select("prodep_helps.*", "empleados.f_nacimiento as fecha_nacimiento")
                ->from("prodep_helps")
                ->join("empleados", function($join) {
                  $join->on("prodep_helps.employee_id","=","empleados.nempleado");
                })
                ->whereRaw("TO_DATE(f_nacimiento, 'DD/MM/YYYY') < NOW() + '-69.5years'");
            }, "inner_terms");
        }, "retirement", function($join) {
          $join->on("prodep_helps.id", "=", "retirement.id");
        })
        ->select("prodep_helps.*");
    }

    public function scopeGender($query, $gender) {
      if ($gender == "Hombre") {
        $gender = "Masculino";
      } else if ($gender == "Mujer"){
        $gender = "Femenino";
      }

      return $query
        ->joinSub(function($query) use ($gender) {
          $query
            ->select("*")
            ->fromSub(function($query) use ($gender) {
              $query
                ->select("prodep_helps.*", "empleados.sexo as sexo")
                ->from("prodep_helps")
                ->join("empleados", function($join) {
                  $join->on("prodep_helps.employee_id","=","empleados.nempleado");
                })
                ->where("sexo", "ILIKE", $gender);
            }, "inner_terms");
        }, "gender", function($join) {
          $join->on("prodep_helps.id", "=", "gender.id");
        })
        ->select("prodep_helps.*");
    }

    public function scopeCampus($query, $name) {
      return $query
        ->joinSub(function($query) use ($name) {
          $query
            ->select("*")
            ->fromSub(function($query) use ($name) {
              $query
                ->select("prodep_helps.*", "unidades.unidad as unidad")
                ->from("prodep_helps")
                ->join("empleados", function($join) {
                  $join->on("prodep_helps.employee_id","=","empleados.nempleado");
                })
                ->join("unidades", function($join) {
                  $join->on("empleados.nunidad","=","unidades.nunidad");
                })
                ->where("campus", "ILIKE", $name);
              }, "inner_terms");
        }, "campus", function($join) {
          $join->on("prodep_helps.id", "=", "campus.id");
        })
        ->select("prodep_helps.*");
    }

    public function scopeTerms($query, $terms) {
      if (empty($terms)) {
        return $query;
      }

      $where = [];
      for ($i = 0; $i < count($terms); $i++) {
        $where[] = array(DB::raw("CONCAT_WS(' ', nombre, apaterno, amaterno, employee_id, unidad, date, type_name)"), "ILIKE", "%".$terms[$i]."%");
      }

      return $query
        ->joinSub(function($query) use ($where) {
          $query
            ->select("*")
            ->fromSub(function($query) {
              $query
                ->select(
                    "prodep_helps.*",
                    "type_case.type_name",
                    "unidades.unidad",
                    "empleados.nombre",
                    "empleados.apaterno",
                    "empleados.amaterno"
                  )
                ->from("prodep_helps")
                ->joinSub(function($query) {
                  $query
                    ->selectRaw(
                      "id,
                       CASE type
                       WHEN '0' THEN 'Apoyo inicial'
                       WHEN '1' THEN 'Apoyo complementario'
                       WHEN '2' THEN 'Apoyo 6 años'
                       WHEN '3' THEN 'Estancias Cortas'
                       WHEN '4' THEN 'Apoyo publicación'
                       END AS type_name"
                     )
                    ->from("prodep_helps");
                }, "type_case", function($join) {
                  $join->on("prodep_helps.id","=","type_case.id");
                })
                ->join("empleados", function($join) {
                  $join->on("prodep_helps.employee_id","=","empleados.nempleado");
                })
                ->join("unidades", function($join) {
                  $join->on("empleados.nunidad","=","unidades.nunidad");
                });
            }, "inner_terms")
            ->where(function ($query) use ($where) {
              $query->orWhere($where);
            });
        }, "terms", function ($join){
          $join->on("prodep_helps.id", "=", "terms.id");
        })
        ->select("prodep_helps.*");
    }
}
