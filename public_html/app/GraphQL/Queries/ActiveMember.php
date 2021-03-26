<?php


namespace App\GraphQL\Queries;

use Illuminate\Database\Eloquent\Builder;

class ActiveMember
{
    public function __invoke(Builder $builder): Builder
    {
        return $builder->has('academic_bodies_lgacs', '>', 0);
    }
}
