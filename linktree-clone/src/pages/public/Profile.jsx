import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Generate profile URL yang akan dibagikan
  const getProfileUrl = () => {
    return `${window.location.origin}/u/${username}`;
  };

  // Fungsi copy ke clipboard
  const handleShare = async () => {
    const url = getProfileUrl();
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setShowToast(true);
      
      // Reset states setelah 2 detik
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 2000);
    } catch (err) {
      // Fallback untuk browser lama
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/u/${username}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, [username]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="animate-pulse text-violet-400">Memuat profile...</div>
      </div>
    );
  }

  // Not Found State
  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-white mb-2">User tidak ditemukan</h2>
          <p className="text-white/40 mb-6">Username <span className="text-violet-400">@{username}</span> tidak tersedia</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 transition-all duration-150"
          >
            ← Kembali ke Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pb-16 relative" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ✨ Background Effects */}
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

      {/* 🔲 Grid Pattern */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* 📦 Content */}
      <div className="relative z-10 max-w-xl mx-auto px-4 py-10">

        {/* 👤 Profile Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 mb-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {data.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <h1
            className="text-2xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            @{data.username}
          </h1>
          <p className="text-white/40 text-sm mt-1">
            {data.links?.length || 0} link{data.links?.length !== 1 ? 's' : ''} tersedia
          </p>
        </div>

        {/* 📤 Share Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleShare}
            className={`
              group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
              border transition-all duration-200
              ${copied 
                ? 'bg-green-500/20 border-green-500/40 text-green-400' 
                : 'bg-white/[0.04] border-white/10 text-violet-300 hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-violet-200'
              }
            `}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Tersalin!
              </>
            ) : (
              <>
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Bagikan Profile
              </>
            )}
          </button>
        </div>

        {/* 🔗 Links List */}
        <div className="space-y-3">
          {data.links.map((link) => (
            <a
              key={link.id}
              href={`http://localhost:5000/api/click/${link.id}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 w-full px-5 py-4 rounded-2xl 
                         bg-white/[0.04] border border-white/10 
                         hover:bg-violet-500/10 hover:border-violet-500/30 
                         transition-all duration-200"
            >
              <span className="text-white/90 font-medium group-hover:text-white transition-colors">
                {link.title}
              </span>
              <svg 
                className="w-4 h-4 text-white/30 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>

        {/* 🔙 Back Button */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-violet-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </Link>
        </div>

      </div>

      {/* 🍞 Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm shadow-xl">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-white font-medium">Link profile tersalin ke clipboard!</span>
          </div>
        </div>
      )}

    </div>
  );
}