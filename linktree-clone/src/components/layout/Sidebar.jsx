import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    exact: true,
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="1.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="8.5" y="1.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="1.5" y="8.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="8.5" y="8.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    to: "/dashboard/links",
    label: "Links",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7 9.5a3.5 3.5 0 005 0l1.5-1.5a3.536 3.536 0 00-5-5L7.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 5.5a3.5 3.5 0 00-5 0L1.5 7A3.536 3.536 0 006.5 12L7.5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/dashboard/analytics",
    label: "Analytics",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M1.5 13.5V9M5 13.5V5.5M8.5 13.5V8M12 13.5V2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  const isActive = (to, exact) =>
    exact ? pathname === to : pathname.startsWith(to);

  return (
    <aside
      className="w-52 flex-shrink-0 min-h-screen border-r border-white/[0.07] bg-[#0a0a0f] px-3 py-6 flex flex-col gap-1"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Logo */}
      <div className="px-3 mb-6">
        <Link to="/" className="flex items-center gap-1">
          <span
            className="text-white text-lg font-extrabold"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            🌐 Link
          </span>
          <span
            className="text-lg font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            tree
          </span>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5">
        {navItems.map(({ to, label, exact, icon }) => {
          const active = isActive(to, exact);
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.05]"
              }`}
            >
              <span className={active ? "text-violet-400" : "text-white/30"}>
                {icon}
              </span>
              {label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: logout */}
      <div className="mt-auto pt-4 border-t border-white/[0.07]">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M5.5 2.5H3a1 1 0 00-1 1v8a1 1 0 001 1h2.5M9.5 10.5l3-3-3-3M12.5 7.5h-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Keluar
        </button>
      </div>
    </aside>
  );
}