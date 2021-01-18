<?php

namespace App\GraphQL\Mutations;
use App\Models\Network;

class CreateNetwork
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        return Network::create($args);
    }
}
