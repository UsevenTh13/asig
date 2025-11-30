<?php

namespace App\Http\Controllers;

use App\Models\Keluarga;
use App\Models\Jemaat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeluargaController extends Controller
{
    public function index()
    {
        $keluargas = Keluarga::with('kepalaKeluarga')->get();
        $jemaats = Jemaat::all(['id', 'nama']);

        return Inertia::render('Keluargas/Index', [
            'keluargas' => $keluargas,
            'jemaats' => $jemaats,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_keluarga' => 'required|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'kepala_keluarga_id' => 'nullable|exists:jemaats,id',
            'tanggal_pernikahan' => 'nullable|date',
        ]);

        Keluarga::create($validated);

        return redirect()->back()->with('success', 'Data keluarga berhasil ditambahkan.');
    }

    public function update(Request $request, Keluarga $keluarga)
    {
        $validated = $request->validate([
            'nama_keluarga' => 'required|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'kepala_keluarga_id' => 'nullable|exists:jemaats,id',
            'tanggal_pernikahan' => 'nullable|date',
        ]);

        $keluarga->update($validated);

        return redirect()->back()->with('success', 'Data keluarga berhasil diperbarui.');
    }

    public function destroy(Keluarga $keluarga)
    {
        $keluarga->delete();

        return redirect()->back()->with('success', 'Data keluarga berhasil dihapus.');
    }

    public function show(Keluarga $keluarga)
    {
        // load semua relasi penting
        $keluarga->load(['kepalaKeluarga', 'jemaats']);

        // daftar jemaat yang belum punya keluarga (keluarga_id null)
        $jemaatAvailable = Jemaat::whereNull('keluarga_id')->get(['id', 'nama']);

        return Inertia::render('Keluargas/Show', [
            'keluarga' => $keluarga,
            'anggota' => $keluarga->jemaats,
            'jemaatAvailable' => $jemaatAvailable, // dikirim ke Show.tsx
        ]);
    }

    public function addAnggota(Request $request, Keluarga $keluarga)
    {
        $request->validate([
            'jemaat_id' => 'required|exists:jemaats,id',
        ]);

        $jemaat = Jemaat::findOrFail($request->jemaat_id);

        // pastikan jemaat belum memiliki keluarga
        if ($jemaat->keluarga_id) {
            return back()->withErrors(['jemaat_id' => 'Jemaat ini sudah terdaftar dalam keluarga lain.']);
        }

        $jemaat = Jemaat::findOrFail($request->jemaat_id);
        $jemaat->keluarga_id = $keluarga->id;
        $jemaat->save();

        return redirect()->back()->with('success', 'Anggota keluarga berhasil ditambahkan.');
    }

    public function removeAnggota(Keluarga $keluarga, Jemaat $jemaat)
    {
        if ($jemaat->keluarga_id === $keluarga->id) {
            $jemaat->keluarga_id = null;
            $jemaat->save();
        }

        return redirect()->back()->with('success', 'Anggota berhasil dihapus dari keluarga.');
    }
}
