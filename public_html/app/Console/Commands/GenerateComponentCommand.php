<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class GenerateComponentCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:siip-page';

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
        shell_exec("cp public/example ");
        $name = $this->ask('What is your name?');
        return 0;
    }
}
