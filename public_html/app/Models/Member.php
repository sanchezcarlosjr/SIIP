<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'academic_body_member';
    protected $fillable = [
        'academic_bodies_lgacs_id',
        'employee_id'
    ];
}
