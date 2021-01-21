<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GeneratePageCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:siip-page {name} {--module=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make a vue page';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $path = explode('/', $this->argument('name'));
        $module = end($path);
        $resource = "resources/js/{$this->argument('name')}";
        shell_exec("cp -r resources/js/@shared/example {$resource}");
        shell_exec("mv {$resource}/example.page.scss {$resource}/{$module}.page.scss");
        shell_exec("mv {$resource}/example.page.ts {$resource}/{$module}.page.ts");
        Sed::edit("{$resource}/index.vue", $module, "example");
        Sed::edit("{$resource}/{$module}.page.ts", Str::studly($module), "Example");
        Sed::interpolate("{$resource}/{$module}.page.ts", "tableTitle = \"{A}\"");
        return 0;
    }
}
