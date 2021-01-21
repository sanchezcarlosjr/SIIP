<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sni extends Model
{
    use HasFactory;

    public function sni_area()
    {
        return $this->belongsTo(SniArea::class, "sni_area_id");
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, "employee_id");
    }

    protected $fillable = ["start_date", "finish_date", "discipline", "field", "request", "level", "specialty", "employee_id", "sni_area_id"];
}
