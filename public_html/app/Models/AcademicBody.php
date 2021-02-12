<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AcademicBody extends Model
{
    use ActiveMessage;
    use HasFactory;
    protected $table = 'academic_bodies';
    protected $fillable = [
        'name',
        'prodep_key',
        'active',
        'prodep_area_id',
        'lead_employee_id',
        'uabc_areas_id',
        'discipline_id',
        'des_id',
        'created_at'
    ];
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

    public function employees(): BelongsToMany
    {
        return $this->belongsToMany(Employee::class, 'academic_body_member', 'academic_body_id', 'employee_id');
    }

    public function evaluations(): HasMany
    {
        return $this->hasMany(Evaluation::class)->orderBy('finish_date', 'desc');
    }

    public function prodep_area()
    {
        return $this->belongsTo(ProdepArea::class);
    }

    public function uabc_area()
    {
        return $this->belongsTo(UABCArea::class, 'uabc_areas_id', 'narea');
    }
}
