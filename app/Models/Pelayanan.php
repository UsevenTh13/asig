<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pelayanan extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['nama_pelayanan', 'deskripsi'];

    public function anggotaPelayanans()
    {
        return $this->hasMany(AnggotaPelayanan::class);
    }
    public function jemaats()
    {
        return $this->belongsToMany(Jemaat::class, 'anggota_pelayanans', 'pelayanan_id', 'jemaat_id')
                    ->withTimestamps();
    }
}
