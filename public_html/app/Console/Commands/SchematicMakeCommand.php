<?php

namespace App\Console\Commands;

use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

class SchematicMakeCommand extends Command
{
    private $projectPath;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:schematics {module} {path}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new schematic';
    /** @var Sed */

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->projectPath = new ProjectPath();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Generating schematics...');
        $this->ensureIfIsAModel();
        return 0;
    }

    public function ensureIfIsAModel() {
        $model = 'App\\Models\\' . Str::studly(Str::singular($this->argument('module')));
        $isNotAEloquentModel = !is_subclass_of($model, 'Illuminate\Database\Eloquent\Model');
        throw_if($isNotAEloquentModel, new Exception("Module should be an eloquent model"));
    }

    public function createOperations()
    {
        foreach (array("Update", "Create", "Delete") as &$item) {
            $this->addOperation(strtolower($item));
        }
    }

    /**
     * @param string $operation
     */
    public function addOperation(string $operation): void
    {
        $previousLine = "type Mutation {";
        $operationName = "{$operation}{$this->argument('module')}";
        $line = "$operationName(name: string): {$this->argument('module')} @$operation";
        Sed::appendLine($this->projectPath['schema.graphql'], $previousLine, $line);
    }
}
