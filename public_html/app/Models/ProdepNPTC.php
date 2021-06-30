<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Model;

class ProdepNPTC extends Model
{
    use HasFactory;

    protected $fillable = [
      "start_date",
      "employee_id"
    ];
    protected $table = "prodep_nptcs";

    public function employee()
    {
        return $this->belongsTo(Employee::class, "employee_id");
    }

    public function rubros(): MorphMany {
      return $this->morphMany(Rubro::class, "rubrable");
    }

    public function getAmountAttribute()
    {
        return $this->rubros->reduce(function($carry, $rubro) {
          return $carry + $rubro->amount;
        }, 0);
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
