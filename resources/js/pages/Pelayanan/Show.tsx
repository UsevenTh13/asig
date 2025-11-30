import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Jemaat {
  id: number;
  nama: string;
  jenis_kelamin?: string;
  telepon?: string;
}

interface Pelayanan {
  id: number;
  nama_pelayanan: string;
  deskripsi?: string;
}

interface PageProps {
  pelayanan: Pelayanan;
  anggota: Jemaat[];
  allJemaats: Jemaat[];
}

export default function Show({
  pelayanan,
  anggota = [],
  allJemaats = [],
}: PageProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedJemaat, setSelectedJemaat] = useState<string>("");

  const handleAddAnggota = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJemaat) {
      toast.warning("Pilih jemaat terlebih dahulu!");
      return;
    }

    router.post(
      route("pelayanans.addAnggota", pelayanan.id),
      { jemaat_id: selectedJemaat },
      {
        onSuccess: () => {
          toast.success("Anggota berhasil ditambahkan!");
          setSelectedJemaat("");
          setShowModal(false);
        },
        onError: (errors) => {
          toast.error(errors.jemaat_id || "Gagal menambahkan anggota.");
        },
      }
    );
  };

  const handleRemoveAnggota = (id: number) => {
    if (!confirm("Yakin ingin menghapus anggota ini?")) return;
    router.delete(route("pelayanans.removeAnggota", [pelayanan.id, id]), {
      onSuccess: () => toast.success("Anggota dihapus dari pelayanan."),
      onError: () => toast.error("Terjadi kesalahan."),
    });
  };

  return (
    <AppLayout>
      <Head title={`Pelayanan ${pelayanan.nama_pelayanan}`} />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            🙌 Pelayanan {pelayanan.nama_pelayanan}
          </h1>
          <Link href={route("pelayanans.index")}>
            <Button variant="outline">← Kembali</Button>
          </Link>
        </div>

        {/* Info Pelayanan */}
        <Card className="p-4 space-y-2 border border-gray-200 shadow-sm">
          <p>
            <strong>Nama Pelayanan:</strong> {pelayanan.nama_pelayanan}
          </p>
          <p>
            <strong>Deskripsi:</strong> {pelayanan.deskripsi || "-"}
          </p>
        </Card>

        {/* Daftar Anggota */}
        <Card className="p-4 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-md">👥 Daftar Anggota Pelayanan</h2>
            <Button
              onClick={() => setShowModal(true)}
              disabled={allJemaats.length === 0}
              title={
                allJemaats.length === 0
                  ? "Semua jemaat sudah memiliki 2 pelayanan atau sudah tergabung di sini"
                  : ""
              }
            >
              + Tambah Anggota
            </Button>
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
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Belum ada anggota pelayanan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        {/* Modal Tambah Anggota */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Anggota ke Pelayanan</DialogTitle>
            </DialogHeader>

            {allJemaats.length === 0 ? (
              <div className="text-center text-gray-500 py-6">
                Semua jemaat sudah tergabung atau sudah memiliki 2 pelayanan.
              </div>
            ) : (
              <form onSubmit={handleAddAnggota} className="space-y-4 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pilih Jemaat
                  </label>
                  <select
                    value={selectedJemaat}
                    onChange={(e) => setSelectedJemaat(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">-- Pilih Jemaat --</option>
                    {allJemaats.map((jemaat) => (
                      <option key={jemaat.id} value={jemaat.id}>
                        {jemaat.nama}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit">Tambah</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
