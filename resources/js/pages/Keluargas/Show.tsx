import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Jemaat {
  id: number;
  nama: string;
  jenis_kelamin?: string;
  telepon?: string;
}

interface Keluarga {
  id: number;
  nama_keluarga: string;
  alamat?: string;
  tanggal_pernikahan?: string;
  kepala_keluarga?: { id: number; nama: string };
}

interface PageProps {
  keluarga: Keluarga;
  anggota: Jemaat[];
  jemaatAvailable: Jemaat[];
}

export default function Show({ keluarga, anggota, jemaatAvailable }: PageProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedJemaat, setSelectedJemaat] = useState<number | null>(null);

  const handleAddAnggota = () => {
    if (!selectedJemaat) {
      toast.error("Pilih jemaat terlebih dahulu");
      return;
    }

    router.post(
      route("keluargas.addAnggota", keluarga.id),
      { jemaat_id: selectedJemaat },
      {
        onSuccess: () => {
          toast.success("Anggota berhasil ditambahkan");
          setShowModal(false);
          setSelectedJemaat(null);
        },
        onError: () => toast.error("Gagal menambahkan anggota"),
      }
    );
  };

  const handleRemoveAnggota = (jemaatId: number) => {
    if (!confirm("Yakin ingin menghapus anggota ini dari keluarga?")) return;
    router.delete(route("keluargas.removeAnggota", { keluarga: keluarga.id, jemaat: jemaatId }), {
      onSuccess: () => toast.success("Anggota berhasil dihapus"),
      onError: () => toast.error("Gagal menghapus anggota"),
    });
  };

  return (
    <AppLayout>
      <Head title={`Keluarga ${keluarga.nama_keluarga}`} />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">👪 Keluarga {keluarga.nama_keluarga}</h1>
          <Link href={route("keluargas.index")}>
            <Button variant="outline">← Kembali</Button>
          </Link>
        </div>

        {/* Informasi Keluarga */}
        <Card className="p-4 space-y-2 border border-gray-200 shadow-sm">
          <p>
            <strong>Alamat:</strong> {keluarga.alamat || "-"}
          </p>
          <p>
            <strong>Kepala Keluarga:</strong> {keluarga.kepala_keluarga?.nama || "-"}
          </p>
          <p>
            <strong>Tanggal Pernikahan:</strong> {keluarga.tanggal_pernikahan || "-"}
          </p>
        </Card>

        {/* Daftar Anggota */}
        <Card className="p-4 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-md">Daftar Anggota Keluarga</h2>
            <Button onClick={() => setShowModal(true)}>+ Tambah Anggota</Button>
          </div>

          <table className="min-w-full text-sm border border-gray-200 rounded-md">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">Jenis Kelamin</th>
                <th className="px-4 py-3 text-left">Telepon</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {anggota.length > 0 ? (
                anggota.map((a, i) => (
                  <tr key={a.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">{a.nama}</td>
                    <td className="px-4 py-2">
                      {a.jenis_kelamin === "L"
                        ? "Laki-laki"
                        : a.jenis_kelamin === "P"
                        ? "Perempuan"
                        : "-"}
                    </td>
                    <td className="px-4 py-2">{a.telepon || "-"}</td>
                    <td className="px-4 py-2 text-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveAnggota(a.id)}
                      >
                        🗑️ Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Belum ada anggota keluarga.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Modal Tambah Anggota */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
          <DialogTitle>Tambah Anggota Keluarga</DialogTitle>
              <p className="text-sm text-gray-500">
                Pilih jemaat yang belum memiliki keluarga.
              </p>
          </DialogHeader>
          <div className="space-y-3">
            <select
              className="w-full border rounded-md p-2"
              value={selectedJemaat ?? ""}
              onChange={(e) => setSelectedJemaat(Number(e.target.value))}
            >
              <option value="">-- Pilih Jemaat --</option>
              {jemaatAvailable.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.nama}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Batal
              </Button>
              <Button onClick={handleAddAnggota}>Simpan</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
