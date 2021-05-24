<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdepArea extends Model
{
    use HasFactory;

    public function scopeName($query, $value) {
      return $query->where("name", "ILIKE", "%".$value."%");
    }
}
