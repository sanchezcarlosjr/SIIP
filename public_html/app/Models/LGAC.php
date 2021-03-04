<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class LGAC extends Model
{
    use HasFactory;
    protected $table = 'academic_bodies_lgacs';
    protected $fillable = [
        'key',
        'name',
        'description',
        'academic_body_id',
    ];

    public function academic_body(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'academic_body_id');
    }

    public function employees(): BelongsToMany
    {
        return $this->belongsToMany(Employee::class, 'academic_body_member', 'academic_bodies_lgacs_id', 'employee_id');
    }
}
