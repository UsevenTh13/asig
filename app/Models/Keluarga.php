<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Keluarga extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nama_keluarga',
        'alamat',
        'kepala_keluarga_id',
        'tanggal_pernikahan',
    ];

    // ✅ Relasi ke Jemaat (kepala keluarga)
    public function kepalaKeluarga()
    {
        return $this->belongsTo(Jemaat::class, 'kepala_keluarga_id');
    }

    // (Opsional) relasi ke anggota keluarga
    public function anggota()
    {
        return $this->hasMany(Jemaat::class, 'keluarga_id');
    }
    
    public function jemaats()
    {
        return $this->hasMany(Jemaat::class, 'keluarga_id');
    }

}
