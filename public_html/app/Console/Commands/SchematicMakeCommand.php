<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

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
    /** @var Sed */

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
        $this->info('Generating schematics...');
        $this->makeMutation();
        shell_exec("cp -r resources/js/@shared/example resources/js/{$this->argument('path')}");
        $this->info('Ready!');
        return 0;
    }

    /**
     * @param string $operation
     */
    public function addOperation(string $operation): void
    {
        $mutation = "type Mutation {";
        $operation = "{$operation}{$this->argument('module')}";
        $parameters = "name:String";
        $replace = "{$mutation}\\n    $operation({$parameters}): {$this->argument('module')}";
        $this->set($mutation, $replace, "graphql/schema.graphql");
    }

    public function set(string $regex, string $replace, string $file)
    {
        $set = new Sed($regex, $replace, $file);
        $set->exec();
    }

    public function resolver(string $operation): void
    {
        $file = "app/GraphQL/Mutations/{$operation}{$this->argument('module')}.php";
        $from = "\/\/ TODO implement the resolver";
        $replace = $this->factory($operation);
        $this->set($from, $replace, $file);
        $this->set("Mutations;", "Mutations;\\nuse App\\\Models\\\\{$this->argument('module')};", $file);
    }

    public function factory(string $operation) {
        switch ($operation) {
            case "Create":
                return "return {$this->argument('module')}::create(\$args);";
            case "Update":
                return "{$this->argument('module')}::find(\$args['id'])->update(\$args);\\nreturn {$this->argument('module')}::find(\$args['id']);";
            case "Destroy":
                return "return {$this->argument('module')}::destroy(\$args['id']);";
        }
        return '';
    }

    /**
     * @return string
     */
    public function makeMutation(): string
    {
        foreach (array("Update", "Create", "Destroy") as &$item) {
            Artisan::call('lighthouse:mutation', [
                    'name' => "{$item}{$this->argument('module')}"]
            );
            $this->resolver($item);
            $this->addOperation(strtolower($item));
        }
        return $item;
    }
}
