<?php

namespace App\GraphQL\Mutations;

use App\Models\Network;
use Illuminate\Http\UploadedFile;

class CreateNetwork
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        if (isset($args['formation']) && $args['formation'][0]) {
            /** @var UploadedFile $file */
            $file = $args['formation'][0];
            $args['formation_url'] = $file->storePublicly('public');
        }
        return Network::create($args);
    }
}
