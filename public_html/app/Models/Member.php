<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $table = 'academic_body_member';
    protected $fillable = [
        'academic_bodies_lgacs_id',
        'employee_id'
    ];
    use HasFactory;
}
