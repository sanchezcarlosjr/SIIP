<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Researcher extends Model
{
    use HasFactory;

    protected $fillable = ["valid", "probative", "employee_id"];

    public function employee()
    {
        return $this->belongsTo(Employee::class, "employee_id");
    }
}
