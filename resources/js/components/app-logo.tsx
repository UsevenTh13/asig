import { usePage } from "@inertiajs/react";
import MyLogo from "@/components/Logo/logo_asig.png"; // <-- Import logo kamu

export default function AppLogo() {
  const setting = usePage().props.setting as {
    nama_app?: string;
  } | null;

  const defaultAppName = "Aplikasi Sistem Informasi Gereja";
  const appName = setting?.nama_app || defaultAppName;

  return (
    <div className="flex items-center gap-2">
      {/* Gunakan logo lokal */}
      <img
        src={MyLogo}
        alt="Logo Gereja"
        className="h-8 w-8 rounded-md object-contain"
      />

      {/* Nama aplikasi */}
      <div className="grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-none font-semibold">
          {appName}
        </span>
      </div>
    </div>
  );
}
