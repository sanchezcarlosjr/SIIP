<?php


namespace App\Console\Commands;


use Exception;

class Sed
{
    private $operation = '';
    public function __construct(string $regex, string $replace, string $file = "{}") {
        $this->operation = "sed -i 's/$regex/$replace/g' $file";
    }

    static public function commentIn(string $directory, string $regex) {
        $sed = new Sed($regex, "# $regex");
        $sed->exec_in($directory);
    }

    static public function uncommentIn(string $directory, string $regex) {
        $sed = new Sed("# $regex", $regex);
        $sed->exec_in($directory);
    }

    static public function appendLine(string $file, string $regex, string $line) {
        $sed = new Sed($regex, "$regex \\n  $line", $file);
        $sed->exec();
    }

    public function exec()
    {
        shell_exec($this->operation );
    }

    public function exec_in(string $directory)
    {
        throw_if($directory === '.', new Exception("Directory cannot be all project"));
        shell_exec("find $directory -type f -exec $this->operation \;");
    }
}
