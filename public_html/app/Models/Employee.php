<?php

namespace App\Models;

use Carbon\Exceptions\Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class Employee extends Model
{
    const birthdayFormat = "d/m/Y";
    const Male = "M";
    const Female = "F";
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
        )->whereNull('academic_body_member.deleted_at')->withTimestamps();
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

    public function getFullNameAttribute()
    {
        return "{$this->nombre} {$this->apaterno} {$this->amaterno}";
    }

    public function getAgeAttribute()
    {
        try {
            return Carbon::today()->diffInYears(Carbon::createFromFormat(Employee::birthdayFormat, $this->f_nacimiento));
        } catch (Exception $e) {
            return null;
        }
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

    public function scopeNameOrId($query, $value)
    {
        if (empty($value)) {
            return $query;
        }

        return $query
            ->joinSub(function ($query) use ($value) {
                $query
                    ->select("*")
                    ->from("empleados")
                    ->whereRaw("CONCAT_WS(' ', nempleado, nombre, apaterno, amaterno) ILIKE ?", "%" . $value . "%");
            }, "name_or_id", function ($join) {
                $join->on("empleados.nempleado", "=", "name_or_id.nempleado");
            })
            ->select("empleados.*");
    }

    public function scopeId($query, $id)
    {
        if (empty($id)) {
            return $query;
        }

        return $query
            ->joinSub(function ($query) use ($id) {
                $query
                    ->select("*")
                    ->from("empleados")
                    ->where("empleados.nempleado", "ILIKE", "%" . $id . "%");
            }, "id", function ($join) {
                $join->on("empleados.nempleado", "=", "id.nempleado");
            })
            ->select("empleados.*");
    }

    public function scopeName($query, $name)
    {
        if (empty($name)) {
            return $query;
        }

        return $query
            ->joinSub(function ($query) use ($name) {
                $query
                    ->select("*")
                    ->from("empleados")
                    ->whereRaw("CONCAT_WS(' ', nombre, apaterno, amaterno) ILIKE ?", "%" . $name . "%");
            }, "name", function ($join) {
                $join->on("empleados.nempleado", "=", "name.nempleado");
            })
            ->select("empleados.*");
    }

    public function getIsLeaderAttribute()
    {
        $academic_body = $this->getAcademicBodyAttribute();
        return !($academic_body == null || $academic_body->leader == null) && $academic_body->leader->nempleado == $this->nempleado;
    }

    public function getAcademicBodyAttribute()
    {
        $lgac = $this->academic_bodies_lgacs->get(0);
        return $lgac->academic_body ?? null;
    }

    public function getIsResearcherAttribute(): bool
    {
        return $this->researchers->where('valid', '>', Carbon::now())->count() > 0;
    }

    /*public function getBenefitsAttribute() {
      $prodep = $this->prodep_helps;
      $helps = $this->helps;
      return ($prodep->merge($helps))->sortBy("date");
    }*/

    public function scopeCandidatesFor($query, $academic_body_id)
    {
        return $query
            ->whereHas('academic_bodies_lgacs', function ($query) use ($academic_body_id) {
                $query->where('academic_body_id', '=', $academic_body_id);
            }, '=', 1)
            ->orHas('academic_bodies_lgacs', '=', '0');
    }

    public function scopeCollaborators($query)
    {
        return $query->has("collaborator_academic_bodies", ">", 0);
    }

    public function scopeMembers($query)
    {
        return $query->has("academic_bodies_lgacs", ">", 0);
    }

    public function scopeFree($query, $free)
    {
      $free = !($free === "Miembros");
      return $query->has('academic_bodies_lgacs', ($free ? '=' : '>'), 0);
    }

    public function scopeLeaders($query)
    {
        return $query
            ->joinSub(function ($query) {
                $query
                    ->select("empleados.*")
                    ->from("empleados")
                    ->join("academic_bodies", "empleados.nempleado", "=", "academic_bodies.lead_employee_id");
            }, "ab_members", function ($join) {
                $join->on("empleados.nempleado", "=", "ab_members.nempleado");
            })
            ->select("empleados.*");
    }

    public function scopeAcademicBodyMembers($query, $id)
    {
        return $query
            ->joinSub(function ($query) use ($id) {
                $query
                    ->select("empleados.*")
                    ->from("empleados")
                    ->leftJoin("academic_body_member", "empleados.nempleado", "=", "academic_body_member.employee_id")
                    ->leftJoin("academic_bodies_lgacs", "academic_body_member.academic_bodies_lgacs_id", "=", "academic_bodies_lgacs.id")
                    ->leftJoin("academic_bodies", "academic_bodies_lgacs.academic_body_id", "=", "academic_bodies.id")
                    ->where("academic_bodies.id", "=", $id)
                    ->groupBy("nempleado");
            }, "ab_members", function ($join) {
                $join->on("empleados.nempleado", "=", "ab_members.nempleado");
            })
            ->select("empleados.*");
    }

    public function scopeAcademicBodyCollaborators($query, $id)
    {
        return $query->whereHas("collaborator_academic_bodies", function ($query) use ($id) {
            $query->where("academic_body_id", "=", $id);
        });
    }

    public function scopeCloseToRetirement($query)
    {
        $sixMonthsOrLessToRetirement = "TO_DATE(f_nacimiento, 'DD/MM/YYYY') < NOW() + '-69.5years'";
        return $query->whereRaw($sixMonthsOrLessToRetirement);
    }

    public function scopeGender($query, $gender)
    {
        $gender = $this->toGenderInDatabase($gender);
        return $query->where('sexo', 'ILIKE', $gender);
    }

    private function toGenderInDatabase($gender): string
    {
        switch ($gender) {
            case "Hombre":
                return self::Male;
            case "Mujer":
                return self::Female;
            default:
                return "";
        }
    }

    public function scopeCampus($query, $campus)
    {
        return $query
            ->joinSub(function ($query) use ($campus) {
                $query
                    ->select("empleados.*")
                    ->from("empleados")
                    ->join("unidades", "empleados.nunidad", "=", "unidades.nunidad")
                    ->where("campus", "ILIKE", $campus);
            }, "campus", function ($join) {
                $join->on("empleados.nempleado", "=", "campus.nempleado");
            })
            ->select("empleados.*");
    }

    public function scopeTerms($query, $terms)
    {
        if (empty($terms)) {
            return $query;
        }

        $where = [];
        for ($i = 0; $i < count($terms); $i++) {
            $where[] = array(DB::raw("CONCAT_WS(' ', nombre, apaterno, amaterno, nempleado, unidad, campus, academic_body)"), "ILIKE", "%" . $terms[$i] . "%");
        }

        return $query
            ->joinSub(function ($query) use ($where) {
                $query
                    ->select("*")
                    ->fromSub(function ($query) {
                        $query
                            ->select(
                                DB::raw("DISTINCT ON (empleados.nempleado) empleados.*"),
                                "unidades.unidad",
                                "unidades.campus",
                                "academic_bodies.name as academic_body"
                            )
                            ->from("empleados")
                            ->leftJoin("unidades", "empleados.nunidad", "=", "unidades.nunidad")
                            ->leftJoin("academic_body_member", "empleados.nempleado", "=", "academic_body_member.employee_id")
                            ->leftJoin("academic_bodies_lgacs", "academic_body_member.academic_bodies_lgacs_id", "=", "academic_bodies_lgacs.id")
                            ->leftJoin("academic_bodies", "academic_bodies_lgacs.academic_body_id", "=", "academic_bodies.id");
                    }, "inner_terms")
                    ->where(function ($query) use ($where) {
                        $query->where($where);
                    });
            }, "terms", function ($join) {
                $join->on("empleados.nempleado", "=", "terms.nempleado");
            })
            ->select("empleados.*");
    }
}
