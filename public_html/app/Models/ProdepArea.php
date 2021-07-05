<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdepArea extends Model
{
    use HasFactory;
    protected $table = "areas_prodep";

    public function scopeName($query, $value) {
      return $query->where("nombre", "ILIKE", "%".$value."%");
    }
}
