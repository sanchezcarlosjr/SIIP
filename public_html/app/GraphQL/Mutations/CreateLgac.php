<?php

namespace App\GraphQL\Mutations;

use App\Models\LGAC;

class CreateLgac
{
    public function __invoke($_, array $args)
    {
        return LGAC::create($args);
    }
}
