<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CollaboratorNetwork extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'type', "academic_bodies_network_id"];
    public function network(): BelongsTo
    {
        return $this->belongsTo(Network::class, 'academic_bodies_network_id');
    }
    public function getIsLeaderAttribute()
    {
        $network = $this->network();
        return $network->get()[0]->leader->id == $this->id;
    }
}
