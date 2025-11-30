import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { toast } from "sonner";

interface PelayananForm {
  nama_pelayanan: string;
  deskripsi?: string;
  [key: string]: any;
}

interface Props {
  show: boolean;
  onClose: () => void;
  pelayanan: any | null;
}

export default function ModalForm({ show, onClose, pelayanan }: Props) {
  const { data, setData, post, put, processing, errors, reset } = useForm<PelayananForm>({
    nama_pelayanan: "",
    deskripsi: "",
  });

  useEffect(() => {
    if (pelayanan) {
      setData({
        nama_pelayanan: pelayanan.nama_pelayanan || "",
        deskripsi: pelayanan.deskripsi || "",
      });
    } else {
      reset();
    }
  }, [pelayanan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pelayanan) {
      put(route("pelayanans.update", pelayanan.id), {
        onSuccess: () => {
          toast.success("Data pelayanan berhasil diperbarui.");
          onClose();
        },
      });
    } else {
      post(route("pelayanans.store"), {
        onSuccess: () => {
          toast.success("Data pelayanan berhasil ditambahkan.");
          onClose();
        },
      });
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{pelayanan ? "Edit Pelayanan" : "Tambah Pelayanan"}</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nama_pelayanan">Nama Pelayanan</Label>
          <Input
            id="nama_pelayanan"
            type="text"
            value={data.nama_pelayanan}
            onChange={(e) => setData("nama_pelayanan", e.target.value)}
            placeholder="Contoh: Musik, Multimedia, Ibadah Minggu"
          />
          <InputError message={errors.nama_pelayanan} />
        </div>

        <div>
          <Label htmlFor="deskripsi">Deskripsi</Label>
          <Input
            id="deskripsi"
            type="text"
            value={data.deskripsi || ""}
            onChange={(e) => setData("deskripsi", e.target.value)}
            placeholder="Deskripsi singkat pelayanan (opsional)"
          />
          <InputError message={errors.deskripsi} />
        </div>

        <DialogFooter className="pt-4 flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" disabled={processing}>
            {pelayanan ? "Update" : "Simpan"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
