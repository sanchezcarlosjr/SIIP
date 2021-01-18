<?php

namespace App\GraphQL\Mutations;
use App\Models\Network;

class DestroyNetwork
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        return Network::destroy($args['id']);
    }
}
