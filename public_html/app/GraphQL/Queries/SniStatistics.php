<?php


namespace App\GraphQL\Queries;

class SniStatistics
{
    private $fields;

    /**
     * @param $_
     * @param array $args
     */
    public function __invoke($_, array $args)
    {
        $this->fields = array_flip($args["filter"]);
        $to = new Period($args["to"]);
        $this->fields["periods"] = $to->to($args["from"]);
        foreach ($args["filter"] as $criteria) {
            $this->fields[$criteria] = $this->$criteria();
        }
        return $this->fields;
    }

    public function men(): array
    {
        $men = collect([]);
        foreach ($this->fields["periods"] as $period) {
            $men->push(random_int(0,10));
        }
        return $men->toArray();
    }

    public function undergraduates(): array
    {
        $undergraduates = collect([]);
        foreach ($this->fields["periods"] as $period) {
            $undergraduates->push(random_int(0,10));
        }
        return $undergraduates->toArray();
    }

    public function postgraduates(): array
    {
        $postgraduates = collect([]);
        foreach ($this->fields["periods"] as $period) {
            $postgraduates->push(random_int(0,10));
        }
        return $postgraduates->toArray();
    }

    public function women(): array
    {
        $women = collect([]);
        foreach ($this->fields["periods"] as $period) {
            $women->push(random_int(0,10));
        }
        return $women->toArray();
    }


}
