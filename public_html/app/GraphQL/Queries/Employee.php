<?php

namespace App\GraphQL\Queries;

use Illuminate\Database\Eloquent\Builder;

class Employee
{
  public function name_like(Builder $builder, String $name): Builder {
      return $builder->where(function($query) use ($name) {
        $query->where("nombre", "ILIKE", "%".$name."%")
          ->orWhere("amaterno", "ILIKE", "%".$name."%")
          ->orWhere("apaterno", "ILIKE", "%".$name."%");
      });
  }

  public function is_lgac_member(Builder $builder, bool $m): Builder {
    return $builder->has('academic_bodies_lgacs', ($m?'>':'<='), 0);
  }
}
