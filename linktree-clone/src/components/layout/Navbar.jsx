export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#0a0a0f]/80 backdrop-blur-md"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1.5">
          <span className="text-white text-lg" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>
            🌐 Link
          </span>
          <span
            className="text-lg font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            tree
          </span>
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="/dashboard"
            className="text-white/40 hover:text-white/70 text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            Dashboard
          </a>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2M9 10l3-3-3-3M12 7H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Keluar
          </button>
        </div>
      </div>
    </nav>
  );
}