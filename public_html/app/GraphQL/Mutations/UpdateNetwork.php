<?php

namespace App\GraphQL\Mutations;

use App\Models\Network;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UpdateNetwork
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
            $previousFormationURL = $args['formation_url'];
            $args['formation_url'] = $file->storePublicly('public');
            Storage::delete($previousFormationURL);
            unset($args['formation']);
        }
        Network::where('id', '=', $args['id'])->update($args);
        return Network::find($args['id']);
    }
}
