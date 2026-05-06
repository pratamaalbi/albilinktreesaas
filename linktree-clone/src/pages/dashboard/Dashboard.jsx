import { useState } from "react";
import { Link } from "react-router-dom";
import Links from "./Links";
import ConfirmModal from "../../components/ui/ConfirmModal";

export default function Dashboard() {
  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const getUsername = () => {
    try {
      const token = localStorage.getItem("token");
      return JSON.parse(atob(token.split(".")[1])).username;
    } catch {
      return "";
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={logoutModal}
        danger
        title="Keluar dari akun?"
        message="Kamu akan keluar dari sesi ini. Pastikan semua perubahan sudah tersimpan."
        confirmLabel="Ya, keluar"
        onConfirm={handleLogout}
        onCancel={() => setLogoutModal(false)}
      />

      <div className="min-h-screen bg-[#0a0a0f]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div
            className="absolute rounded-full opacity-20"
            style={{ width: 420, height: 420, background: "#7c3aed", filter: "blur(80px)", top: -100, left: -80 }}
          />
          <div
            className="absolute rounded-full opacity-15"
            style={{ width: 300, height: 300, background: "#06b6d4", filter: "blur(80px)", bottom: -60, right: -60 }}
          />
        </div>

        <div
          className="pointer-events-none fixed inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-xl mx-auto px-4 py-10">

          <div className="mb-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  <span className="text-violet-300 text-[11px] font-medium tracking-widest uppercase">
                    Dashboard
                  </span>
                </div>
                <h1
                  className="text-3xl font-extrabold text-white tracking-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Bio Link
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {" "}Kamu
                  </span>
                </h1>
                <p className="text-white/40 text-sm mt-1">Kelola dan pantau semua link kamu</p>
              </div>

              <div className="flex flex-col gap-2 mt-1">
                <Link
                  to="/dashboard/analytics"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-150"
                >
                  📊 Analytics
                </Link>

                
               <a
  href={`/u/${getUsername()}`}
  target="_blank"
  rel="noreferrer"
  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-violet-300 border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 transition-all duration-150"
>
  🔗 Lihat Profile
</a>

                <button
  onClick={() => setLogoutModal(true)}
  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/40 border border-white/10 bg-white/[0.04] hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-150"
>
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2H3a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h2M9 10l3 -3l-3 -3M12 7H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  Keluar
</button>
              </div>
            </div>
          </div>

          <Links />
        </div>
      </div>
    </>
  );
}