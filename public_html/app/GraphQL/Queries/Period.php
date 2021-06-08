<?php


namespace App\GraphQL\Queries;

class Period
{
    private $period;
    public function __construct(string $period)
    {
        $this->period = intval(explode("-", $period)[0]);
    }

    public function to(string $period) {
        $period = new Period($period);
        $periods = collect([]);
        while ($this->greaterThan($period)) {
            $periods->prepend($this->period . "-2");
            $periods->prepend($this->period . "-1");
            $this->period--;
        }
        return $periods->toArray();
    }

    private function greaterThan(Period $period): bool
    {
        return $this->period >= $period->period;
    }
}
