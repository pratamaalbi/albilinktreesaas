// Home.jsx — Linktree Landing Page
// Font: tambahkan di globals.css atau layout.js:
// @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

export default function Home() {
  const links = [
    {
      icon: "📸",
      iconBg: "bg-gradient-to-br from-yellow-400 to-pink-500",
      name: "Instagram",
      url: "instagram.com/kamu",
    },
    {
      icon: "▶",
      iconBg: "bg-red-500",
      name: "YouTube Channel",
      url: "youtube.com/@kamu",
    },
    {
      icon: "𝕏",
      iconBg: "bg-sky-500",
      name: "Twitter / X",
      url: "x.com/kamu",
    },
  ];

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden bg-[#0a0a0f]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: 420,
            height: 420,
            background: "#7c3aed",
            filter: "blur(80px)",
            top: -100,
            left: -80,
          }}
        />
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: 300,
            height: 300,
            background: "#06b6d4",
            filter: "blur(80px)",
            bottom: -60,
            right: -60,
          }}
        />
        <div
          className="absolute rounded-full opacity-15"
          style={{
            width: 200,
            height: 200,
            background: "#f59e0b",
            filter: "blur(80px)",
            top: "40%",
            left: "60%",
          }}
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
      <div className="relative z-10 w-full max-w-sm text-center animate-[fadeUp_0.7s_cubic-bezier(.22,1,.36,1)_both]">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/15">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-violet-300 text-[11px] font-medium tracking-widest uppercase">
            Bio Link Builder
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-5xl font-extrabold text-white tracking-tight leading-none mb-3"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          🌐 Link
          <span
            className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
          >
            tree
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/40 font-light text-sm leading-relaxed mb-10">
          Buat halaman bio link kamu sendiri —<br />
          simpel, cantik, dan gratis.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_4px_20px_rgba(124,58,237,0.45)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.6)] hover:-translate-y-0.5 active:scale-95 transition-all duration-150"
          >
            Register
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="/login"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-medium text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 active:scale-95 transition-all duration-150"
          >
            Masuk
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5 opacity-0 animate-[fadeUp_0.5s_0.35s_ease_forwards]">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/25 text-[11px] tracking-widest uppercase">
            Contoh tampilan
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Preview link cards */}
        <div className="flex flex-col gap-2 opacity-0 animate-[fadeUp_0.7s_0.25s_cubic-bezier(.22,1,.36,1)_forwards]">
          {links.map((link) => (
            <div
              key={link.name}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.09] transition-colors duration-150 text-left"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${link.iconBg}`}
              >
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium leading-none mb-0.5">
                  {link.name}
                </p>
                <p className="text-white/30 text-[11px] truncate">{link.url}</p>
              </div>
              <span className="text-white/20 text-base">›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes — tambahkan di globals.css jika pakai Next.js */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}