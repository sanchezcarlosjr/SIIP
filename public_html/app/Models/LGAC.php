<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LGAC extends Model
{
    use HasFactory;
    protected $table = 'academic_bodies_lgacs';
    protected $fillable = [
        'key',
        'name',
        'description',
        'active',
        'academic_body_id',
    ];
    public function academic_body(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'academic_body_id');
    }
}
