<?php


namespace App\Models;


use Carbon\Carbon;

trait ActiveEmployee
{
    public function scopeActive($query)
    {
        return $query->where('finish_date', ">", Carbon::now())->whereHas('employee', function ($q) {
            return $q->where('estatus', '==', '1');
        });
    }
}
