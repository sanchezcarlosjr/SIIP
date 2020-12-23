<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicUnit extends Model
{
    use HasFactory;
    protected $fillable = [
        'academic_unit_name',
        'promep_key',
        'degree_of_consolidation',
        'register_date',
        'next_revision_date',
        'prodep_area_id',
        'leader_id',
        'uabc_area_id',
        'displine_id',
        'des_id',
        'active'
    ];
}