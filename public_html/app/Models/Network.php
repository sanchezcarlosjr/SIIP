<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Network extends Model
{
    protected $table = "academic_bodies_networks";
    use HasFactory;
    protected $fillable = [
        'name',
        'type',
        'class',
        'academic_body_id',
        'range',
        'start_date',
        'finish_date'
    ];
    public function academic_body(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'academic_body_id');
    }
}
