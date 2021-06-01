<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class Help extends Model
{
    protected $table = "academic_bodies_helps";
    protected $fillable = [
        'amount',
        'type',
        'date',
        'release_url',
        'report_url',
        'academic_body_id',
        'benefited_employee_id'
    ];
    use HasFactory;

    public function getTypeNameAttribute() {
      switch($this->type) {
        case 0: return "Estancias Cortas";
        case 1: return "Apoyo a publicación";
        case 2: return "Convocatoria Redes";
        case 3: return "Convocatoria fortalecimiento de CA";
        case 4: return "Becas postdoctorado";
      }
    }

    public function benefited_employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'benefited_employee_id');
    }
    public function academic_body(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'academic_body_id');
    }

    public function scopeAcademicBody($query, $id) {
      return $query->where("academic_bodies_helps.academic_body_id", "=", $id);
    }

    public function scopeTerms($query, $terms) {
      if (empty($terms)) {
        return $query;
      }

      $where = [];
      for ($i = 0; $i < count($terms); $i++) {
        $where[] = array(DB::raw("CONCAT_WS(' ', type_name, date, nombre, apaterno, amaterno, unidad, campus, academic_body)"), "ILIKE", "%".$terms[$i]."%");
      }

      return $query
        ->joinSub(function($query) use ($where) {
          $query
            ->select("*")
            ->fromSub(function($query) {
              $query
                ->select(
                  "academic_bodies_helps.*",
                  "academic_bodies.name as academic_body",
                  "empleados.nombre",
                  "empleados.apaterno",
                  "empleados.amaterno",
                  "unidades.unidad",
                  "unidades.campus"
                )
                ->from("academic_bodies_helps")
                ->joinSub(function($query) {
                  $query
                    ->selectRaw(
                      "id,
                       CASE type
                       WHEN '0' THEN 'Estancias Cortas'
                       WHEN '1' THEN 'Apoyo a publicación'
                       WHEN '2' THEN 'Convocatoria Redes'
                       WHEN '3' THEN 'Convocatoria fortalecimiento de CA'
                       WHEN '4' THEN 'Becas postdoctorado'
                       END AS type_name"
                     )
                    ->from("academic_bodies_helps");
                }, "type_case", function($join) {
                  $join->on("academic_bodies_helps.id","=","type_case.id");
                })
                ->join("academic_bodies", "academic_bodies_helps.academic_body_id", "academic_bodies.id")
                ->join("empleados", "academic_bodies_helps.benefited_employee_id", "empleados.nempleado")
                ->join("unidades", "empleados.nunidad", "unidades.nunidad");
            }, "inner_terms")
            ->where(function ($query) use ($where) {
              $query->where($where);
            });
        }, "terms", function ($join) {
          $join->on("academic_bodies_helps.id", "=", "terms.id");
        })
        ->select("academic_bodies_helps.*");
    }
}
