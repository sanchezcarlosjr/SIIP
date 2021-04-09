<?php

namespace App\GraphQL\Queries;

use Illuminate\Database\Eloquent\Builder;

class Employee
{
    public function filter(Builder $builder, array $filter): Builder
    {
        if (count($filter) == 0) {
            return $builder;
        }
        $nameOrId = $filter[0];
        return $builder->where(function ($query) use ($nameOrId) {
            $query->where("nombre", "ILIKE", "%" . $nameOrId . "%")
                ->orWhere("amaterno", "ILIKE", "%" . $nameOrId . "%")
                ->orWhere("apaterno", "ILIKE", "%" . $nameOrId . "%")
                ->orWhere("nempleado", "ILIKE", "%" . $nameOrId . "%");
        });
    }

    public function is_lgac_member(Builder $builder, bool $m): Builder
    {
        return $builder->has('academic_bodies_lgacs', ($m ? '>' : '<='), 0);
    }
}
