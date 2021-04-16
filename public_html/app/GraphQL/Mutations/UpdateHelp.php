<?php


namespace App\GraphQL\Mutations;


use App\Models\Help;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UpdateHelp
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
            $previousFormationURL = $args['release_url'];
            $args['release_url'] = $file->storePublicly('public');
            Storage::delete($previousFormationURL);
            unset($args['release']);
        }
        if (isset($args['report']) && $args['report'][0]) {
            /** @var UploadedFile $file */
            $file = $args['report'][0];
            $previousFormationURL = $args['report_url'];
            $args['report_url'] = $file->storePublicly('public');
            Storage::delete($previousFormationURL);
            unset($args['report']);
        }
        Help::where('id', '=', $args['id'])->update($args);
        return Help::find($args['id']);
    }
}
