<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DES extends Model
{
    protected $primaryKey = 'cdes';
    protected $table = 'des';
    use HasFactory;
}
