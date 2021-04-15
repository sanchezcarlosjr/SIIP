<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

class Employee extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'nempleado';
    protected $table = 'empleados';
    protected $appends = [
        "academic_body",
        "full_name",
        "age",
        "is_ptc",
        "has_active_prodep_profile",
        "has_active_sni"
    ];
    use HasFactory;

    public function newQuery($excludeDeleted = true): Builder
    {
        return parent::newQuery($excludeDeleted);
    }

    public function academic_bodies_lgacs(): BelongsToMany
    {
        return $this->belongsToMany(
            LGAC::class,
            'academic_body_member',
            'employee_id',
            'academic_bodies_lgacs_id'
        );
    }

    public function collaborator_academic_bodies(): BelongsToMany
    {
        return $this->belongsToMany(
            AcademicBody::class,
            'collaborators',
            'employee_id',
            'academic_body_id'
        );
    }

    public function getHasActiveProdepProfileAttribute()
    {
        return $this->prodep_profiles->contains("is_active", true);
    }

    public function getHasActiveSniAttribute()
    {
        return $this->snis->contains("is_active", true);
    }

    public function getAcademicBodyAttribute()
    {
        $lgac = $this->academic_bodies_lgacs->get(0);
        return isset($lgac->academic_body) ? $lgac->academic_body : null;
    }

    public function getFullNameAttribute()
    {
        return "{$this->nombre} {$this->apaterno} {$this->amaterno}";
    }

    public function getAgeAttribute()
    {
        return Carbon::today()->diffInYears(Carbon::parse($this->f_nacimiento));
    }

    public function getIsPTCAttribute()
    {
        $cat = $this->c_categoria;
        return (($cat >= 501 && $cat <= 509) || ($cat >= 104 && $cat <= 112)) && $this->estatus == 1;
    }

    public function academic_unit()
    {
        return $this->belongsTo(AcademicUnit::class, 'nunidad');
    }

    public function helps()
    {
        return $this->hasMany(Help::class, 'benefited_employee_id');
    }

    public function prodep_profiles()
    {
        return $this->hasMany(ProdepProfile::class, 'employee_id');
    }

    public function prodep_helps()
    {
        return $this->hasMany(ProdepHelp::class, 'employee_id');
    }

    public function prodep_nptcs()
    {
        return $this->hasMany(ProdepNPTC::class, 'employee_id');
    }

    public function snis()
    {
        return $this->hasMany(Sni::class, 'employee_id');
    }

    public function researchers()
    {
        return $this->hasMany(Researcher::class, 'employee_id');
    }

    public function scopePtcs($query)
    {
        return $query->where('estatus', '==', '1')->whereBetween('c_categoria', [501, 509])->orWhereBetween('c_categoria', [104, 112]);
    }

    public function getIsLeaderAttribute()
    {
        $academic_body = $this->getAcademicBodyAttribute();
        if ($academic_body == null || $academic_body->leader == null) {
            return false;
        }
        return $academic_body->leader->nempleado == $this->nempleado;
    }

}
