import React, { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import ModalForm from "./ModalForm";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface Pelayanan {
  id: number;
  nama_pelayanan: string;
  deskripsi?: string;
  created_at: string;
}

interface PageProps {
  pelayanans: Pelayanan[];
  flash?: { success?: string };
}

export default function Index({ pelayanans, flash }: PageProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPelayanan, setSelectedPelayanan] = useState<Pelayanan | null>(
    null
  );

  const openModal = (pelayanan: Pelayanan | null = null) => {
    setSelectedPelayanan(pelayanan);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPelayanan(null);
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    router.delete(route("pelayanans.destroy", id), {
      onSuccess: () => toast.success("Data pelayanan berhasil dihapus."),
      onError: () => toast.error("Terjadi kesalahan saat menghapus."),
    });
  };

  return (
    <AppLayout>
      <Head title="Manajemen Pelayanan" />

      <div className="space-y-4">
        {flash?.success && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <AlertTitle>Berhasil</AlertTitle>
            <AlertDescription>{flash.success}</AlertDescription>
          </Alert>
        )}

        <Card className="p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-semibold">Daftar Pelayanan</h1>
            <Button onClick={() => openModal()} className="btn-primary">
              + Tambah Pelayanan
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-md">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Nama Pelayanan</th>
                  <th className="px-4 py-3 text-left">Deskripsi</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pelayanans.length > 0 ? (
                  pelayanans.map((pelayanan, index) => (
                    <tr
                      key={pelayanan.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-medium">
                        {pelayanan.nama_pelayanan}
                      </td>
                      <td className="px-4 py-2">
                        {pelayanan.deskripsi || "-"}
                      </td>
                      <td className="px-4 py-2 text-center space-x-2">
                        {/* Tombol Lihat Anggota */}
                        <Link
                          href={route("pelayanans.show", pelayanan.id)}
                        >
                          <Button size="sm" variant="secondary">
                            👥 Anggota
                          </Button>
                        </Link>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openModal(pelayanan)}
                        >
                          ✏️ Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(pelayanan.id)}
                        >
                          🗑️ Hapus
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      Belum ada data pelayanan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {showModal && (
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <ModalForm
              show={showModal}
              onClose={closeModal}
              pelayanan={selectedPelayanan}
            />
          </Dialog>
        )}
      </div>
    </AppLayout>
  );
}
