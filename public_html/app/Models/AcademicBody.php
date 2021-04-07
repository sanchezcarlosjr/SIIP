<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AcademicBody extends Model
{
    use HasFactory;

    protected $table = 'academic_bodies';
    protected $fillable = [
        'name',
        'prodep_key',
        'active',
        'prodep_area_id',
        'lead_employee_id',
        'discipline',
        'des_id',
        'created_at'
    ];

    public function newQuery($excludeDeleted = true): Builder
    {
        return parent::newQuery($excludeDeleted)->orderByDesc('created_at');
    }

    public function lgacs()
    {
        return $this->hasMany(LGAC::class);
    }

    public function networks()
    {
        return $this->hasMany(Network::class);
    }

    public function helps()
    {
        return $this->hasMany(Help::class);
    }

    public function evaluations(): HasMany
    {
        return $this->hasMany(Evaluation::class)->orderBy('finish_date', 'desc');
    }

    public function prodep_area()
    {
        return $this->belongsTo(ProdepArea::class);
    }

}
