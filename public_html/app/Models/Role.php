<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $fillable = [
        'rol'
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];
    public function permissions() {
        return $this->belongsToMany(
            Modulo::class,
            'permisos',
            'rol_id',
            'modulo_id'
        )->withPivot('crear', 'destruir', 'editar', 'leer');
    }
}
