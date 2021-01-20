<?php

namespace App\Console\Commands;

use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class SchematicMakeCommand extends Command
{
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
    private $projectPath;
    private $model;
    private $module;
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
        $this->appendFillableFields();
        return 0;
    }

    public function ensureIfIsAModel()
    {
        $this->info('Ensuring your module...');
        $this->module = Str::studly(Str::singular($this->argument('module')));
        $this->model = 'App\\Models\\' . $this->module;
        $isNotAEloquentModel = !is_subclass_of($this->model, 'Illuminate\Database\Eloquent\Model');
        throw_if($isNotAEloquentModel, new Exception("Module should be an eloquent model"));
    }

    private function appendFillableFields(): void
    {
        $this->info('Appending fillable fields...');
        $instance = new $this->model();
        $columnListing = Schema::getColumnListing($instance->getTable());
        $fillableFields = $this->choice(
            'Which are your fillable fields?',
            array_merge(['default'], $columnListing),
            0,
            $maxAttempts = null,
            $allowMultipleSelections = true
        );
        $columns = '';
        $file = "app/Models/{$this->module}.php";
        $line = "use HasFactory;";
        if ($fillableFields[0] === "default") {
            $collection = collect($columnListing);
            $filtered = $collection->filter(function ($value, $key) {
                return $value !== 'id' and $value !== 'created_at' and $value !== 'updated_at';
            });
            $columns = implode('","', $filtered->all());
        } else {
            $columns = implode('","', $fillableFields);
        }
        Sed::appendLine($file, $line, "protected \$fillable = [\"{$columns}\"];");
    }

    public function createOperations()
    {
        foreach (array("update", "create", "delete") as &$item) {
            $this->addOperation($item);
        }
    }

    /**
     * @param string $operation
     */
    public function addOperation(string $operation): void
    {
        $previousLine = "type Mutation {";
        $operationName = "{$operation}{$this->module}";
        $line = "$operationName(name: string): {$this->module} @$operation";
        Sed::appendLine($this->projectPath['schema.graphql'], $previousLine, $line);
    }
}
