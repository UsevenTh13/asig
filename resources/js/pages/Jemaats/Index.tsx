import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ModalForm from "@/pages/Jemaats/ModalForm";

interface Jemaat {
  id: number;
  nama: string;
  alamat?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: string;
  telepon?: string;
  email?: string;
  pelayanan?: { id: number; nama_pelayanan: string };
  keluarga?: { id: number; nama_keluarga: string };
}

interface PageProps {
  jemaats: Jemaat[];
  pelayanans: { id: number; nama_pelayanan: string }[];
  keluargas: { id: number; nama_keluarga: string }[];
  flash?: { success?: string };
}

export default function Index({
  jemaats,
  pelayanans,
  keluargas,
  flash,
}: PageProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedJemaat, setSelectedJemaat] = useState<Jemaat | null>(null);

  const openModal = (jemaat: Jemaat | null = null) => {
    setSelectedJemaat(jemaat);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedJemaat(null);
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    router.delete(route("jemaats.destroy", id), {
      onSuccess: () => toast.success("Data jemaat berhasil dihapus."),
      onError: () => toast.error("Terjadi kesalahan saat menghapus."),
    });
  };

  return (
    <AppLayout>
      <Head title="Manajemen Jemaat" />

      <div className="space-y-4">
        {flash?.success && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <AlertTitle>Berhasil</AlertTitle>
            <AlertDescription>{flash.success}</AlertDescription>
          </Alert>
        )}

        <Card className="p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-semibold">Daftar Jemaat</h1>
            <Button
              onClick={() => openModal()}
              className="btn-primary"
            >
              + Tambah Jemaat
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-md">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Nama</th>
                  <th className="px-4 py-3 text-left">Keluarga</th>
                  <th className="px-4 py-3 text-left">Pelayanan</th>
                  <th className="px-4 py-3 text-left">Telepon</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {jemaats.length > 0 ? (
                  jemaats.map((jemaat, index) => (
                    <tr
                      key={jemaat.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-medium">{jemaat.nama}</td>
                      <td className="px-4 py-2">{jemaat.keluarga?.nama_keluarga || "-"}</td>
                      <td className="px-4 py-2">{jemaat.pelayanan?.nama_pelayanan || "-"}</td>
                      <td className="px-4 py-2">{jemaat.telepon || "-"}</td>
                      <td className="px-4 py-2">{jemaat.email || "-"}</td>
                      <td className="px-4 py-2 text-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openModal(jemaat)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(jemaat.id)}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">
                      Belum ada data jemaat.
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
              jemaat={selectedJemaat}
              pelayanans={pelayanans}
              keluargas={keluargas}
            />
          </Dialog>
        )}
      </div>
    </AppLayout>
  );
}
