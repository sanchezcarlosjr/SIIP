<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
  use HasFactory;
  use SoftDeletes;

  protected $table = 'academic_body_member';
  protected $fillable = [
      'academic_bodies_lgacs_id',
      'employee_id'
  ];
  protected $softDelete = true;

  public function employee() {
    return $this->belongsTo(Employee::class, "employee_id");
  }

  public function lgac() {
    return $this->belongsTo(LGAC::class, "academic_bodies_lgacs_id");
  }

  public function getAcademicBodyAttribute() {
    return $this->lgac->academic_body;
  }

  public function getAcademicBodyIdAttribute() {
    return $this->academic_body->id;
  }

  /*public function scopeAcademicBody($query, $id) {
    return $query
      ->joinSub(function($query) use ($id) {
        $query
          ->select(
            "academic_body_member.*"
          )
          ->from("academic_body_member")
          ->join("academic_bodies_lgacs", function($join) {
            $join->on("academic_body_member.academic_bodies_lgacs_id", "=", "academic_bodies_lgacs.id");
          })
          ->join("academic_bodies", function($join) {
            $join->on("academic_bodies_lgacs.academic_body_id", "=", "academic_bodies.id");
          })
          ->where("academic_bodies.id", "=", $id);
      }, "inner_terms", function($join) {
        $join->on("academic_body_member.id", "=", "inner_terms.id");
      })
      ->select("academic_body_member.*");
  }*/
}
