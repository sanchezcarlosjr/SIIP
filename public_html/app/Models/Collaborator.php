<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collaborator extends Model
{
    protected $fillable = [
        'academic_body_id',
        'employee_id'
    ];
    use HasFactory;

    public function academicBody() {
      return $this->belongsTo(AcademicBody::class, "academic_body_id", "id");
    }

    public function employee() {
      return $this->belongsTo(Employee::class, "employee_id", "nempleado");
    }
}
