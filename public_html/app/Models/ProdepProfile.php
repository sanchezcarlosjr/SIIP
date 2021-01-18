<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProdepProfile extends Model
{
    use HasFactory;
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
    public function prodep_area(): BelongsTo
    {
        return $this->belongsTo(ProdepArea::class);
    }
}
