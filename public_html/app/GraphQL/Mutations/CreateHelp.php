<?php


namespace App\GraphQL\Mutations;


use App\Models\Help;
use Illuminate\Http\UploadedFile;

class CreateHelp
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        if (isset($args['release']) && $args['release'][0]) {
            /** @var UploadedFile $file */
            $file = $args['release'][0];
            $args['release_url'] = $file->storePublicly('public');
        }
        if (isset($args['report']) && $args['report'][0]) {
            /** @var UploadedFile $file */
            $file = $args['report'][0];
            $args['report_url'] = $file->storePublicly('public');
        }
        return Help::create($args);
    }
}
