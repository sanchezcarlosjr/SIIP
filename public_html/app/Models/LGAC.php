<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;

class LGAC extends Model
{
    use HasFactory;
    protected $table = 'academic_bodies_lgacs';
    protected $fillable = [
        'key',
        'name',
        'description',
        'academic_body_id',
    ];

    public function academic_body(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'academic_body_id');
    }

    public function employees(): BelongsToMany
    {
        return $this->belongsToMany(Employee::class,
          'academic_body_member',
          'academic_bodies_lgacs_id',
          'employee_id'
        )->whereNull('academic_body_member.deleted_at')->withTimestamps();
    }

    public function scopeAcademicBody($query, $id) {
      return $query->where("academic_body_id", "=", $id);
    }

    public function scopeTerms($query, $terms) {
      if (empty($terms)) {
        return $query;
      }

      $where = [];
      for ($i = 0; $i < count($terms); $i++) {
        $where[] = array(DB::raw("CONCAT_WS(' ', name, description, academic_body, prodep_area, nombre, apaterno, amaterno, unidad)"), "ILIKE", "%".$terms[$i]."%");
      }
/*
      return $query->where(function ($query) use ($where) {
        $query->orWhere($where);
      });*/

      return $query
        ->joinSub(function($query) use ($where) {
          $query
            ->select("*")
            ->fromSub(function($query) {
              $query
                ->select(
                  "academic_bodies_lgacs.*",
                  "academic_bodies.name as academic_body",
                  "prodep_areas.name as prodep_area",
                  "empleados.nombre",
                  "empleados.apaterno",
                  "empleados.amaterno",
                  "unidades.unidad"
                )
                ->from("academic_bodies_lgacs")
                ->join("academic_bodies", "academic_bodies_lgacs.academic_body_id", "academic_bodies.id")
                ->join("prodep_areas", "academic_bodies.prodep_area_id", "prodep_areas.id")
                ->join("empleados", "academic_bodies.lead_employee_id", "empleados.nempleado")
                ->join("unidades", "empleados.nunidad", "unidades.nunidad");
            }, "inner_terms")
            ->where(function ($query) use ($where) {
              $query->where($where);
            });
        }, "terms", function ($join) {
          $join->on("academic_bodies_lgacs.id", "=", "terms.id");
        })
        ->select("academic_bodies_lgacs.*");
    }
}
