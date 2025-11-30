<?php

namespace App\Http\Controllers;

use App\Models\Jemaat;
use App\Models\Pelayanan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Keluarga;
use App\Models\AnggotaPelayanan;

class JemaatController extends Controller
{
    public function index()
    {
        return Inertia::render('Jemaats/Index', [
            'jemaats' => \App\Models\Jemaat::with(['pelayanan', 'keluarga'])
            ->orderBy('created_at', 'desc')
            ->get(),
        'pelayanans' => \App\Models\Pelayanan::select('id', 'nama_pelayanan')->get(),
        'keluargas' => \App\Models\Keluarga::select('id', 'nama_keluarga')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => 'nullable|in:L,P',
            'telepon' => 'nullable|string|max:20',
            'email' => 'nullable|email',
            'pelayanan_id' => 'nullable|exists:pelayanans,id',
            'keluarga_id' => 'nullable|exists:keluargas,id',
        ]);

        Jemaat::create($validated);

        return redirect()->route('jemaats.index')->with('success', 'Data jemaat berhasil ditambahkan.');
    }

    public function update(Request $request, Jemaat $jemaat)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'jenis_kelamin' => 'nullable|in:L,P',
            'telepon' => 'nullable|string|max:20',
            'email' => 'nullable|email',
            'pelayanan_id' => 'nullable|exists:pelayanans,id',
            'keluarga_id' => 'nullable|exists:keluargas,id',
        ]);

        $jemaat->update($validated);

        return redirect()->route('jemaats.index')->with('success', 'Data jemaat berhasil diperbarui.');
    }

    public function destroy(Jemaat $jemaat)
    {
        $jemaat->delete();
        return redirect()->back()->with('success', 'Data jemaat berhasil dihapus.');
    }
}
