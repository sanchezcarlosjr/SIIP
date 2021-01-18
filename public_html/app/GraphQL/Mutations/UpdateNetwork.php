<?php

namespace App\GraphQL\Mutations;

use App\Models\Network;

class UpdateNetwork
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        Network::find($args['id'])->update($args);
        return Network::find($args['id']);
    }
}
