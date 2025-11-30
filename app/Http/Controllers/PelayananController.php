<?php

namespace App\Http\Controllers;

use App\Models\Pelayanan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Jemaat;
use App\Models\AnggotaPelayanan;

class PelayananController extends Controller
{
    public function index()
    {
        $pelayanans = Pelayanan::latest()->get();

        return Inertia::render('Pelayanan/Index', [
            'pelayanans' => $pelayanans,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pelayanan' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);

        Pelayanan::create($validated);

        return redirect()->back()->with('success', 'Pelayanan berhasil ditambahkan!');
    }

    public function show(Pelayanan $pelayanan)
    {
        // Muat relasi anggota pelayanan beserta jemaatnya
        $pelayanan->load('jemaats');
    
        // Ambil semua anggota pelayanan ini
        $anggota = $pelayanan->jemaats()
            ->select('jemaats.id', 'jemaats.nama', 'jemaats.jenis_kelamin', 'jemaats.telepon')
            ->get();
    
        // Cari jemaat yang sudah punya 2 pelayanan (batas maksimal)
        $jemaatSudahPenuh = \DB::table('anggota_pelayanans')
            ->select('jemaat_id')
            ->groupBy('jemaat_id')
            ->havingRaw('COUNT(pelayanan_id) >= 2')
            ->pluck('jemaat_id');

    
        // Ambil jemaat yang masih bisa ditambahkan (belum punya 2 pelayanan dan belum tergabung di pelayanan ini)
        $allJemaats = Jemaat::whereNotIn('id', $jemaatSudahPenuh)
            ->whereDoesntHave('pelayanans', function ($q) use ($pelayanan) {
                $q->where('pelayanan_id', $pelayanan->id);
            })
            ->select('id', 'nama', 'jenis_kelamin', 'telepon')
            ->orderBy('nama')
            ->get();
    
        return Inertia::render('Pelayanan/Show', [
            'pelayanan' => $pelayanan,
            'anggota' => $anggota,
            'allJemaats' => $allJemaats,
        ]);
    }
    
    public function addAnggota(Request $request, Pelayanan $pelayanan)
{
    $request->validate([
        'jemaat_id' => 'required|exists:jemaats,id',
    ]);

    $pelayanan->jemaats()->syncWithoutDetaching([$request->jemaat_id]);

    return back()->with('success', 'Anggota pelayanan berhasil ditambahkan.');
    }

    public function removeAnggota(Pelayanan $pelayanan, Jemaat $jemaat)
    {
        $pelayanan->jemaats()->detach($jemaat->id);

        return back()->with('success', 'Anggota dihapus dari pelayanan.');
    }

    public function update(Request $request, Pelayanan $pelayanan)
    {
        $validated = $request->validate([
            'nama_pelayanan' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);

        $pelayanan->update($validated);

        return redirect()->back()->with('success', 'Pelayanan berhasil diperbarui!');
    }

    public function destroy(Pelayanan $pelayanan)
    {
        $pelayanan->delete();

        return redirect()->back()->with('success', 'Pelayanan berhasil dihapus!');
    }
}
