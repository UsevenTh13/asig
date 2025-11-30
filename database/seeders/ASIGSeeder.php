<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Jemaat;
use App\Models\Pelayanan;
use App\Models\Keluarga;

class ASIGSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin Default
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);

        // 2. Pelayanan (Contoh)
        $pelayananIbadah = Pelayanan::create([
            'nama_pelayanan' => 'Ibadah Raya',
            'deskripsi' => 'Tim pelayan ibadah Minggu',
        ]);

        $pelayananMusik = Pelayanan::create([
            'nama_pelayanan' => 'Musik & WL',
            'deskripsi' => 'Tim pujian penyembahan',
        ]);

        $pelayananMultimedia = Pelayanan::create([
            'nama_pelayanan' => 'Multimedia',
            'deskripsi' => 'Tim media & peralatan',
        ]);

        // 3. Keluarga Contoh
        $keluarga = Keluarga::create([
            'nama_keluarga' => 'Keluarga Simarmata',
        ]);

        // 4. Data Jemaat
        Jemaat::create([
            'nama' => 'Budi Simarmata',
            'alamat' => 'Jl. Melati No. 15',
            'tanggal_lahir' => '1995-03-12',
            'jenis_kelamin' => 'L',
            'telepon' => '08123456789',
            'email' => 'budi@example.com',
            'pelayanan_id' => $pelayananIbadah->id,
            'keluarga_id' => $keluarga->id,
        ]);

        Jemaat::create([
            'nama' => 'Siska Simarmata',
            'alamat' => 'Jl. Melati No. 15',
            'tanggal_lahir' => '1997-09-27',
            'jenis_kelamin' => 'P',
            'telepon' => '08129876543',
            'email' => 'siska@example.com',
            'pelayanan_id' => $pelayananMusik->id,
            'keluarga_id' => $keluarga->id,
        ]);

        Jemaat::create([
            'nama' => 'Roni Sitorus',
            'alamat' => 'Jl. Kenanga No. 22',
            'tanggal_lahir' => '2002-04-17',
            'jenis_kelamin' => 'L',
            'telepon' => '08234567890',
            'email' => 'roni@example.com',
            'pelayanan_id' => $pelayananMultimedia->id,
            'keluarga_id' => null,
        ]);
    }
}
