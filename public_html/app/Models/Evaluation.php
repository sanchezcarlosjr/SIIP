<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Evaluation extends Model
{
    protected $table = 'academic_bodies_evaluations';
    protected $fillable = ['grade', 'finish_date', 'start_date', 'academic_body_id'];
    use HasFactory;

    public function academic_bodies(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'academic_body_id');
    }

}
