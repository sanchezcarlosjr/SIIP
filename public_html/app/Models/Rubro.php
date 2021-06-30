<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Model;

class Rubro extends Model
{
    use HasFactory;
    protected $table = 'prodep_rubros';
    protected $fillable = [
        'amount',
        'authorized',
        'name',
        'rubrable_id',
        'rubrable_type'
    ];

    public function rubrable(): MorphTo {
      return $this->morphTo();
    }
}
