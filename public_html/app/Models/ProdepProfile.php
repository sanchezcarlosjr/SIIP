<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ProdepProfile extends Model
{
    use HasFactory;
    use ActiveEmployee;

    protected $fillable = ["start_date", "finish_date", "employee_id", "prodep_area_id"];

    public function prodep_area()
    {
        return $this->belongsTo(ProdepArea::class, "prodep_area_id");
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, "employee_id");
    }

}
