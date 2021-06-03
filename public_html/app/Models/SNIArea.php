<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SNIArea extends Model
{
    protected $table = 'sni_areas';
    use HasFactory;
    public function scopeName($query, $value) {
        return $query->where("name", "ILIKE", "%".$value."%");
    }
}
