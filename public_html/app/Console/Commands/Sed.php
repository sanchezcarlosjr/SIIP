<?php


namespace App\Console\Commands;


class Sed
{
    private $operation = '';
    public function __construct(string $regex, string $replace, string $file = "{}") {
        $this->operation = "sed -i 's/$regex/$replace/g' $file";
    }

    static public function comment_in(string $directory, string $regex) {
        $sed = new Sed("A", "B");
        $sed->exec_in($directory);
    }

    static public function uncomment_in(string $directory, string $regex) {
        $sed = new Sed("# $regex", "$regex");
        $sed->exec_in($directory);
    }

    public function exec()
    {
        shell_exec($this->operation);
    }

    public function exec_in(string $directory)
    {
        shell_exec("find databases/migrations -type f -exec sed -i 's/A/A/g' {} \;");
    }
}
