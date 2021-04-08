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
      "Tijuana"
    ]);
    $customQueries = [];
    foreach ($custom as $value) {
      $customQueries[] = ["name", "like", "%".$value."%"];
    }

    $ab = AcademicBody::orWhere($customQueries)->paginate(200);

    if (in_array("Vigente", $filters)) {
      $ab = $ab->filter(function($item) {
        return $item->active;
      })->values();
    }
    if (in_array("Sin Vigencia", $filters)) {
      $ab = $ab->filter(function($item) {
        return !$item->active;
      })->values();
    }
    if (in_array("Mexicali", $filters)) {
      $ab = $ab->filter(function($item) {
        if (isset($item->leader)) {
          if (isset($item->leader->academic_unit)) {
            return $item->leader->academic_unit->unidad == "Mexicali";
          }
        }
      })->values();
    }
    if (in_array("Ensenada", $filters)) {
      $ab = $ab->filter(function($item) {
        if (isset($item->leader)) {
          if (isset($item->leader->academic_unit)) {
            return $item->leader->academic_unit->unidad == "Ensenada";
          }
        }
      })->values();
    }
    if (in_array("Tijuana", $filters)) {
      $ab = $ab->filter(function($item) {
        if (isset($item->leader)) {
          if (isset($item->leader->academic_unit)) {
            return $item->leader->academic_unit->unidad == "Tijuana";
          }
        }
      })->values();
    }

    return $ab;
  }
}
