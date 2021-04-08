<?php

namespace App\GraphQL\Queries;

use Illuminate\Database\Eloquent\Builder;

use App\Models\AcademicBody;

class AcademicBodyFilter
{
  public function __invoke($root, array $args)
  {
    $filters = $args["filter"];
    $custom = array_diff($filters, [
      "Vigente",
      "Sin Vigencia",
      "Mexicali",
      "Ensenada",
      "Tijuana",
      "En formación",
      "En consolidación",
      "Consolidado"
    ]);
    $customQueries = [];
    foreach ($custom as $value) {
      $customQueries[] = ["name", "like", "%".$value."%"];
    }

    $ab = AcademicBody::orWhere($customQueries)->get();


    if (in_array("Vigente", $filters)) {
      $ab = $ab->filter(function($item) {
        return $item->active;
      })->values();
    }
    if (in_array("No vigente", $filters)) {
      $ab = $ab->filter(function($item) {
        return !$item->active;
      })->values();
    }
    if (in_array("Mexicali", $filters)) {
      $ab = $ab->filter(function($item) {
        if (isset($item->leader)) {
          if (isset($item->leader->academic_unit)) {
            return $item->leader->academic_unit->campus == "MEXICALI";
          }
        }
      })->values();
    }
    if (in_array("Ensenada", $filters)) {
      $ab = $ab->filter(function($item) {
        if (isset($item->leader)) {
          if (isset($item->leader->academic_unit)) {
            return $item->leader->academic_unit->campus == "ENSENADA";
          }
        }
      })->values();
    }
    if (in_array("Tijuana", $filters)) {
      $ab = $ab->filter(function($item) {
        if (isset($item->leader)) {
          if (isset($item->leader->academic_unit)) {
            return $item->leader->academic_unit->campus == "TIJUANA";
          }
        }
      })->values();
    }
    if (in_array("En formación", $filters)) {
      $ab = $ab->filter(function($item) {
        if (isset($item->grade)) {
          return $item->grade == "En formación";
        }
      })->values();
    }
    if (in_array("En consolidación", $filters)) {
      $ab = $ab->filter(function($item) {
        if (isset($item->grade)) {
          return $item->grade == "En consolidación";
        }
      })->values();
    }
    if (in_array("Consolidado", $filters)) {
      $ab = $ab->filter(function($item) {
        if (isset($item->grade)) {
          return $item->grade == "Consolidado";
        }
      })->values();
    }

    return ($ab->isEmpty())?AcademicBody::query()->whereNull('id'):$ab->toQuery();
  }
}
