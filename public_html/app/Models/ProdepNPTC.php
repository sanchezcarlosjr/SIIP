<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProdepNPTC extends Model
{
    use HasFactory;

    protected $fillable = [
      "start_date",
      "employee_id",
      "extension",
      "authorized"
    ];
    protected $table = "prodep_nptcs";

    public function employee()
    {
        return $this->belongsTo(Employee::class, "employee_id");
    }

    public function rubros(): MorphMany {
      return $this->morphMany(Rubro::class, "rubrable");
    }

    /** Megarubros */

    public function rubro1(): MorphMany {
      return $this->morphMany(Rubro::class, "rubrable");
    }

    public function rubro2(): MorphMany {
      return $this->morphMany(Rubro::class, "rubrable");
    }

    public function rubro3(): MorphMany {
      return $this->morphMany(Rubro::class, "rubrable");
    }

    public function getAmountAttribute()
    {
        return number_format($this->rubros->reduce(function($carry, $rubro) {
          return $carry + $rubro->amount;
        }, 0), 2, ".", "");
    }

    public function getFinishDateAttribute()
    {
      return Carbon::parse($this->start_date)->addMonths($this->extension?18:12);
    }

    public function scopeAuthorized($query, $value) {
      if ($value == "Autorizado") {
        $value = true;
      } else if ($value == "No autorizado") {
        $value = false;
      } else {
        $value = null;
      }
      return $query->where("authorized", $value);
    }

    public function scopeExtended($query, $value) {
      if ($value == "Con prórroga") {
        $value = true;
      } else { //bruh just $value = $value ==
        $value = false;
      }
      return $query->where("extension", $value);
    }

    public function scopeCampus($query, $campus) {
      return $query
          ->joinSub(DB::table("empleados")
            ->select("empleados.*")
            ->join("unidades", "empleados.nunidad", "=", "unidades.nunidad")
            ->where("campus", "ILIKE", $campus), "campus", function($join) {
              $join->on("prodep_nptcs.employee_id", "=", "campus.nempleado");
            });
    }

    public function scopeTerms($query, $terms) {
      if (empty($terms)) {
        return $query;
      }

      $where = [];
      for ($i = 0; $i < count($terms); $i++) {
        $where[] = array(DB::raw("CONCAT_WS(' ', nombre, apaterno, amaterno, employee_id, unidad, start_date, finish_date, prodep_area)"), "ILIKE", "%".$terms[$i]."%");
      }

      return $query;
    }
}
