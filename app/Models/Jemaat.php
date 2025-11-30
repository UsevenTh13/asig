<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Jemaat extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nama',
        'alamat',
        'tanggal_lahir',
        'jenis_kelamin',
        'telepon',
        'email',
        'pelayanan_id',
        'keluarga_id',
    ];

    public function pelayanan()
    {
        return $this->belongsToMany(
            \App\Models\Pelayanan::class,       // model tujuan
            'anggota_pelayanans',               // nama tabel pivot
            'jemaat_id',                        // foreign key di pivot yang merujuk ke Jemaat
            'pelayanan_id'                      // foreign key di pivot yang merujuk ke Pelayanan
        );
    }    

    public function keluarga()
    {
        return $this->belongsTo(Keluarga::class, 'keluarga_id');
    }
    public function kepalaKeluarga()
    {
        return $this->belongsTo(Jemaat::class, 'kepala_keluarga_id');
    }

    public function anggota()
    {
        return $this->hasMany(Jemaat::class, 'keluarga_id');
    }

    public function jemaats()
    {
        return $this->belongsToMany(Jemaat::class, 'jemaat_pelayanan', 'pelayanan_id', 'jemaat_id')->withTimestamps();
    }


}
