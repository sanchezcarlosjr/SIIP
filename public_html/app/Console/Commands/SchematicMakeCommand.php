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
    protected $signature = 'make:schematics {module}';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new schematic';
    private $projectPath;
    private $model;
    private $module;
    private $fillableFields;
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
//        $this->appendFillableFields();
//        $this->appendRelationships();
        $this->ensureSchema();
//        $this->createOperations();
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
            $this->fillableFields = $collection->filter(function ($value, $key) {
                return $value !== 'id' and $value !== 'created_at' and $value !== 'updated_at';
            });
            $columns = implode('","', $this->fillableFields->all());
        } else {
            $this->fillableFields = $fillableFields;
            $columns = implode('","', $fillableFields);
        }
        Sed::appendLine($file, $line, "protected \$fillable = [\"{$columns}\"];");
    }

    private function appendRelationships()
    {
        $this->info('Appending relationships...');
        $this->fillableFields->filter(function ($value) {
            return preg_match("/_id/i", $value);
        })->each(function ($key) {
            $file = "app/Models/{$this->module}.php";
            $line = "use HasFactory;";
            $methodName = str_replace("_id", "", $key);
            $modelName = Str::studly(Str::singular($methodName));
            $method = "public function {$methodName}() \\n {\\n return \$this->belongsTo({$modelName}::class, \"{$key}\");\\n}";
            Sed::appendLine($file, $line, $method);
        });
    }

    private function ensureSchema()
    {

    }

    public function createOperations()
    {
        $this->info('Creating operations...');
        $this->addIndex();
        foreach (array("update", "create", "delete") as &$item) {
            $this->addOperation($item);
        }
    }

    private function addIndex()
    {
        $previousLine = "type Query {";
        $module_snake_case = Str::snake(Str::plural($this->argument('module')));
        $line = "$module_snake_case: [$this->module] @paginate(defaultCount: 10)";
        Sed::appendLine($this->projectPath['schema.graphql'], $previousLine, $line);
    }

    /**
     * @param string $operation
     */
    public function addOperation(string $operation): void
    {
        $previousLine = "type Mutation {";
        $operationName = "{$operation}{$this->module}";
        $parameters = $this->fillableFields->map(function ($value) {
            if (preg_match("/date/i", $value)) {
                return "{$value}: Date";
            }
            if (preg_match("/id/i", $value)) {
                return "{$value}: Int";
            }
            return "{$value}: String";
        })->implode('\\n');
        if ($operation === 'update') {
            $parameters .= "\\nid: ID";
        }
        if ($operation === 'delete') {
            $parameters = 'id: ID';
        }
        $line = "$operationName($parameters): {$this->module} @$operation";
        Sed::appendLine($this->projectPath['schema.graphql'], $previousLine, $line);
    }
}
