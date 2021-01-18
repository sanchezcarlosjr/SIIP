<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class SeedMigrateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:seed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate legacy and own SIIP migrations and execute seeders';
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
        Sed::comment_in(ProjectPath::migrations, "\$table->foreign");
        return 0;
    }
}
