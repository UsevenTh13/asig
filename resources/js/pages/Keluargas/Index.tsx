import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ModalForm from "@/pages/Keluargas/FormModal";

interface Keluarga {
  id: number;
  nama_keluarga: string;
  alamat?: string;
  kepala_keluarga?: { id: number; nama: string };
  tanggal_pernikahan?: string;
}

interface PageProps {
  keluargas: Keluarga[];
  jemaats: { id: number; nama: string }[];
  flash?: { success?: string };
}

export default function Index({ keluargas, jemaats, flash }: PageProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedKeluarga, setSelectedKeluarga] = useState<Keluarga | null>(null);

  const openModal = (keluarga: Keluarga | null = null) => {
    setSelectedKeluarga(keluarga);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedKeluarga(null);
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    router.delete(route("keluargas.destroy", id), {
      onSuccess: () => toast.success("Data keluarga berhasil dihapus."),
      onError: () => toast.error("Terjadi kesalahan saat menghapus."),
    });
  };

  return (
    <AppLayout>
      <Head title="Manajemen Keluarga" />

      <div className="space-y-4">
        {flash?.success && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <AlertTitle>Berhasil</AlertTitle>
            <AlertDescription>{flash.success}</AlertDescription>
          </Alert>
        )}

        <Card className="p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-semibold">Daftar Keluarga</h1>
            <Button onClick={() => openModal()} className="btn-primary">
              + Tambah Keluarga
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-md">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Nama Keluarga</th>
                  <th className="px-4 py-3 text-left">Kepala Keluarga</th>
                  <th className="px-4 py-3 text-left">Alamat</th>
                  <th className="px-4 py-3 text-left">Tanggal Pernikahan</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {keluargas.length > 0 ? (
                  keluargas.map((keluarga, index) => (
                    <tr key={keluarga.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-medium">{keluarga.nama_keluarga}</td>
                      <td className="px-4 py-2">{keluarga.kepala_keluarga?.nama || "-"}</td>
                      <td className="px-4 py-2">{keluarga.alamat || "-"}</td>
                      <td className="px-4 py-2">{keluarga.tanggal_pernikahan || "-"}</td>
                      <td className="px-4 py-2 text-center space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          router.visit(route("keluargas.show", keluarga.id), {
                            onSuccess: () => toast.info(`Menampilkan anggota keluarga ${keluarga.nama_keluarga}`),
                          })
                        }
                      >
                        👥 Anggota
                      </Button>

                        <Button size="sm" variant="outline" onClick={() => openModal(keluarga)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(keluarga.id)}>
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      Belum ada data keluarga.
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
              keluarga={selectedKeluarga}
              jemaats={jemaats}
            />
          </Dialog>
        )}
      </div>
    </AppLayout>
  );
}
