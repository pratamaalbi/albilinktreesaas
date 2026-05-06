import { useState } from "react";
import API from "../../api/axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/register", { username, email, password });
      console.log("SUCCESS:", res.data);
      window.location.href = "/";
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      setError(err.response?.data?.msg || "Register gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <main
      className="relative min-h-screen flex items-center justify-center px-6 py-16 overflow-hidden bg-[#0a0a0f]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute rounded-full opacity-20"
          style={{ width: 420, height: 420, background: "#7c3aed", filter: "blur(80px)", top: -100, left: -80 }}
        />
        <div
          className="absolute rounded-full opacity-20"
          style={{ width: 300, height: 300, background: "#06b6d4", filter: "blur(80px)", bottom: -60, right: -60 }}
        />
        <div
          className="absolute rounded-full opacity-15"
          style={{ width: 200, height: 200, background: "#f59e0b", filter: "blur(80px)", top: "40%", left: "60%" }}
        />
      </div>

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm animate-[fadeUp_0.7s_cubic-bezier(.22,1,.36,1)_both]">

        {/* Logo link */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kembali
          </a>
          <h1
            className="mt-4 text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            🌐 Link<span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">tree</span>
          </h1>
          <p className="mt-2 text-white/40 text-sm">Buat akun baru kamu</p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 flex flex-col gap-4">

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 4v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/50 text-xs font-medium tracking-wide uppercase">Username</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" />
                <path d="M1.5 13.5c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="username kamu"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-violet-500/60 focus:bg-white/[0.07] transition-all duration-150"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/50 text-xs font-medium tracking-wide uppercase">Email</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="1" y="3" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M1 5l6.5 4L14 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                type="email"
                placeholder="email@kamu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-violet-500/60 focus:bg-white/[0.07] transition-all duration-150"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/50 text-xs font-medium tracking-wide uppercase">Password</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="2.5" y="6" width="10" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M4.5 6V4.5a3 3 0 016 0V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="7.5" cy="9.5" r="1" fill="currentColor" />
              </svg>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-violet-500/60 focus:bg-white/[0.07] transition-all duration-150"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="mt-1 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.6)] hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-150"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" strokeLinecap="round" />
                </svg>
                Memproses...
              </>
            ) : (
              <>
                Buat Akun
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Login link */}
        <p className="mt-5 text-center text-white/30 text-sm">
          Sudah punya akun?{" "}
          <a href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Masuk di sini
          </a>
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}