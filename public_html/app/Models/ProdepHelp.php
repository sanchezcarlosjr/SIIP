<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdepHelp extends Model
{
    use HasFactory;

    protected $fillable = ["amount", "type", "date", "employee_id"];

    public function employee()
    {
        return $this->belongsTo(Employee::class, "employee_id");
    }
}
