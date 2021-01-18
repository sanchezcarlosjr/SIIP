<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Help extends Model
{
    protected $table = "academic_bodies_helps";
    protected $fillable = [
        'amount',
        'type',
        'date',
        'academic_body_id',
        'benefited_employee_id'
    ];
    use HasFactory;
    public function benefited_employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'benefited_employee_id');
    }
    public function academic_body(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'academic_body_id');
    }
}
