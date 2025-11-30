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

interface JemaatForm {
  nama: string;
  alamat?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: string;
  telepon?: string;
  email?: string;
  pelayanan_id?: number | null;
  keluarga_id?: number | null;
  [key: string]: any;
}

interface Props {
  show: boolean;
  onClose: () => void;
  jemaat: any | null;
  pelayanans: { id: number; nama_pelayanan: string }[];
  keluargas: { id: number; nama_keluarga: string }[]; // ✅ baru
}

export default function ModalForm({ show, onClose, jemaat, pelayanans, keluargas }: Props) {
  const { data, setData, post, put, processing, errors, reset } =
    useForm<JemaatForm>({
      nama: "",
      alamat: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      telepon: "",
      email: "",
      pelayanan_id: null,
      keluarga_id: null,
    });

  useEffect(() => {
    if (jemaat) {
      setData({
        nama: jemaat.nama || "",
        alamat: jemaat.alamat || "",
        tanggal_lahir: jemaat.tanggal_lahir || "",
        jenis_kelamin: jemaat.jenis_kelamin || "",
        telepon: jemaat.telepon || "",
        email: jemaat.email || "",
        pelayanan_id: jemaat.pelayanan_id || null,
        keluarga_id: jemaat.keluarga_id || null,
      });
    } else {
      reset();
    }
  }, [jemaat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (jemaat) {
      put(route("jemaats.update", jemaat.id), {
        onSuccess: () => {
          toast.success("Data jemaat berhasil diperbarui.");
          onClose();
        },
      });
    } else {
      post(route("jemaats.store"), {
        onSuccess: () => {
          toast.success("Data jemaat berhasil ditambahkan.");
          onClose();
        },
      });
    }
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{jemaat ? "Edit Jemaat" : "Tambah Jemaat"}</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama */}
        <div>
          <Label htmlFor="nama">Nama Jemaat</Label>
          <Input
            id="nama"
            type="text"
            value={data.nama}
            onChange={(e) => setData("nama", e.target.value)}
            placeholder="Masukkan nama lengkap jemaat"
          />
          <InputError message={errors.nama} />
        </div>

        {/* Jenis Kelamin */}
        <div>
          <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
          <select
            id="jenis_kelamin"
            className="border rounded-md w-full px-3 py-2 mt-1"
            value={data.jenis_kelamin || ""}
            onChange={(e) => setData("jenis_kelamin", e.target.value)}
          >
            <option value="">Pilih jenis kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
          <InputError message={errors.jenis_kelamin} />
        </div>

        {/* Keluarga */}

        <div>
          <Label htmlFor="keluarga_id">Keluarga</Label>
          <select
            id="keluarga_id"
            className="border rounded-md w-full px-3 py-2 mt-1"
            value={data.keluarga_id || ""}
            onChange={(e) =>
              setData("keluarga_id", e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">Pilih keluarga</option>
            {keluargas.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama_keluarga}
              </option>
            ))}
          </select>
          <InputError message={errors.keluarga_id} />
        </div>

        {/* Alamat */}
        <div>
          <Label htmlFor="alamat">Alamat</Label>
          <Input
            id="alamat"
            type="text"
            value={data.alamat || ""}
            onChange={(e) => setData("alamat", e.target.value)}
            placeholder="Alamat tempat tinggal"
          />
          <InputError message={errors.alamat} />
        </div>

        {/* Tanggal Lahir */}
        <div>
          <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
          <Input
            id="tanggal_lahir"
            type="date"
            value={data.tanggal_lahir || ""}
            onChange={(e) => setData("tanggal_lahir", e.target.value)}
          />
          <InputError message={errors.tanggal_lahir} />
        </div>

        {/* Telepon */}
        <div>
          <Label htmlFor="telepon">Nomor Telepon</Label>
          <Input
            id="telepon"
            type="text"
            value={data.telepon || ""}
            onChange={(e) => setData("telepon", e.target.value)}
            placeholder="0812xxxxxxx"
          />
          <InputError message={errors.telepon} />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email || ""}
            onChange={(e) => setData("email", e.target.value)}
            placeholder="jemaat@email.com"
          />
          <InputError message={errors.email} />
        </div>

        {/* Pelayanan */}
        <div>
          <Label htmlFor="pelayanan_id">Pelayanan</Label>
          <select
            id="pelayanan_id"
            className="border rounded-md w-full px-3 py-2 mt-1"
            value={data.pelayanan_id || ""}
            onChange={(e) =>
              setData("pelayanan_id", e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">Pilih pelayanan</option>
            {pelayanans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama_pelayanan}
              </option>
            ))}
          </select>
          <InputError message={errors.pelayanan_id} />
        </div>

        <DialogFooter className="pt-4 flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" disabled={processing}>
            {jemaat ? "Update" : "Simpan"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
