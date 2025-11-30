<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AnggotaPelayanan extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['pelayanan_id', 'jemaat_id', 'jabatan'];

    public function pelayanan()
    {
        return $this->belongsTo(Pelayanan::class);
    }

    public function jemaat()
    {
        return $this->belongsTo(Jemaat::class);
    }
}
