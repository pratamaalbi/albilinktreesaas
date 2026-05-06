import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ← Import Link
import API from "../../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err.response?.data))
      .finally(() => setLoading(false));
  }, []);

  const totalClicks = stats.reduce((sum, s) => sum + (s.count ?? 0), 0);
  const chartData = stats.map((s) => ({
    name: s.title || "Link " + s.id,
    clicks: s.count,
  }));
  const topLink = stats.length ? stats.reduce((a, b) => (a.count > b.count ? a : b)) : null;

  return (
    <div className="min-h-screen bg-[#0a0a0f]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Background orbs */}
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

      {/* Grid texture */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 text-[11px] font-medium tracking-widest uppercase">
                  Analytics
                </span>
              </div>
              <h1
                className="text-3xl font-extrabold text-white tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Statistik
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}Link
                </span>
              </h1>
              <p className="text-white/40 text-sm mt-1">Pantau performa setiap link kamu</p>
            </div>

            {/* 🔙 Back to Dashboard Button */}
            <Link
              to="/dashboard"
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/60 border border-white/10 bg-white/[0.04] hover:text-violet-300 hover:bg-violet-500/10 hover:border-violet-500/30 transition-all duration-150"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Summary cards */}
        {!loading && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Total Klik</p>
              <p
                className="text-3xl font-extrabold text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {totalClicks.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Total Link</p>
              <p
                className="text-3xl font-extrabold text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {stats.length}
              </p>
            </div>
          </div>
        )}

        {/* Chart */}
        {!loading && stats.length > 0 && (
          <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-3">
              Grafik Klik
            </h2>

            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10, 10, 15, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                    cursor={{ fill: 'rgba(124, 58, 237, 0.2)' }}
                  />
                  <Bar dataKey="clicks" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="h-20 rounded-2xl bg-white/[0.04] border border-white/10 animate-pulse" />
              <div className="h-20 rounded-2xl bg-white/[0.04] border border-white/10 animate-pulse" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-2xl bg-white/[0.04] border border-white/10 animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && stats.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-white/10 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 18V12M7 18V8M12 18V10M17 18V4" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-white/40 text-sm font-medium">Belum ada data klik</p>
            <p className="text-white/20 text-xs mt-1">Bagikan link kamu agar mulai terhitung</p>
          </div>
        )}

        {/* Stats list */}
        {!loading && stats.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2
              className="text-sm font-bold text-white/60 uppercase tracking-widest mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Per Link
            </h2>

            {stats
              .slice()
              .sort((a, b) => b.count - a.count)
              .map((s, index) => {
                const pct = totalClicks > 0 ? Math.round((s.count / totalClicks) * 100) : 0;
                const isTop = topLink && s.id === topLink.id;

                return (
                  <div
                    key={s.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-colors duration-150 p-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {/* Rank */}
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          index === 0
                            ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                            : "bg-white/5 text-white/30 border border-white/10"
                        }`}
                      >
                        {index + 1}
                      </div>

                      {/* Label */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-white text-sm font-medium truncate">
                            {s.title}
                          </p>
                          {isTop && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 font-medium">
                              Top
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Count */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-white text-sm font-bold">{(s.count ?? 0).toLocaleString()}</p>
                        <p className="text-white/30 text-xs">{pct}%</p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}