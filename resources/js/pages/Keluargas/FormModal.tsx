import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { toast } from "sonner";

interface KeluargaForm {
  nama_keluarga: string;
  alamat?: string;
  kepala_keluarga_id?: number | null;
  tanggal_pernikahan?: string;
  [key: string]: any; // diperlukan agar sesuai dengan FormDataType
}

interface Props {
  show: boolean;
  onClose: () => void;
  keluarga: any | null;
  jemaats: { id: number; nama: string }[];
}

export default function ModalForm({ show, onClose, keluarga, jemaats }: Props) {
  const { data, setData, post, put, processing, errors, reset } =
    useForm<KeluargaForm>({
      nama_keluarga: "",
      alamat: "",
      kepala_keluarga_id: null,
      tanggal_pernikahan: "",
    });

  useEffect(() => {
    if (keluarga) {
      setData({
        nama_keluarga: keluarga.nama_keluarga || "",
        alamat: keluarga.alamat || "",
        kepala_keluarga_id: keluarga.kepala_keluarga_id || null,
        tanggal_pernikahan: keluarga.tanggal_pernikahan || "",
      });
    } else {
      reset();
    }
  }, [keluarga]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (keluarga) {
      put(route("keluargas.update", keluarga.id), {
        onSuccess: () => {
          toast.success("Data keluarga berhasil diperbarui.");
          onClose();
        },
      });
    } else {
      post(route("keluargas.store"), {
        onSuccess: () => {
          toast.success("Data keluarga berhasil ditambahkan.");
          onClose();
        },
      });
    }
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{keluarga ? "Edit Keluarga" : "Tambah Keluarga"}</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nama_keluarga">Nama Keluarga</Label>
          <Input
            id="nama_keluarga"
            value={data.nama_keluarga}
            onChange={(e) => setData("nama_keluarga", e.target.value)}
            placeholder="Masukkan nama keluarga"
          />
          <InputError message={errors.nama_keluarga} />
        </div>

        <div>
          <Label htmlFor="alamat">Alamat</Label>
          <Input
            id="alamat"
            value={data.alamat || ""}
            onChange={(e) => setData("alamat", e.target.value)}
            placeholder="Alamat keluarga"
          />
          <InputError message={errors.alamat} />
        </div>

        <div>
          <Label htmlFor="kepala_keluarga_id">Kepala Keluarga</Label>
          <select
            id="kepala_keluarga_id"
            className="border rounded-md w-full px-3 py-2 mt-1"
            value={data.kepala_keluarga_id || ""}
            onChange={(e) =>
              setData("kepala_keluarga_id", e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">Pilih jemaat</option>
            {jemaats.map((j) => (
              <option key={j.id} value={j.id}>
                {j.nama}
              </option>
            ))}
          </select>
          <InputError message={errors.kepala_keluarga_id} />
        </div>

        <div>
          <Label htmlFor="tanggal_pernikahan">Tanggal Pernikahan</Label>
          <Input
            id="tanggal_pernikahan"
            type="date"
            value={data.tanggal_pernikahan || ""}
            onChange={(e) => setData("tanggal_pernikahan", e.target.value)}
          />
          <InputError message={errors.tanggal_pernikahan} />
        </div>

        <DialogFooter className="pt-4 flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" disabled={processing}>
            {keluarga ? "Update" : "Simpan"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
