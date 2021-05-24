<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdepNPTC extends Model
{
    use HasFactory;

    protected $fillable = ["amount", "type", "date", "employee_id"];
    protected $table = "prodep_nptcs";

    public function employee()
    {
        return $this->belongsTo(Employee::class, "employee_id");
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
