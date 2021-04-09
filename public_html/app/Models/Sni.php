<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Carbon;

class Sni extends Model
{
    use HasFactory;
    use ActiveEmployee;

    protected $fillable = ["start_date", "finish_date", "discipline", "field", "request", "level", "specialty", "employee_id", "sni_area_id"];
    protected $appends = [
      "is_active"
    ];

    public function getIsActiveAttribute() {
      return Carbon::today()->lessThan($this->finish_date);
    }

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    public function sni_area()
    {
        return $this->belongsTo(SNIArea::class, "sni_area_id");
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, "employee_id");
    }


}
