export default function ConfirmModal({ isOpen, onConfirm, onCancel, title, message, confirmLabel = "Ya, lanjutkan", danger = false }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#13131a] p-6 shadow-2xl"
        style={{ animation: "popIn 0.2s cubic-bezier(.22,1,.36,1) both" }}
      >
        {/* Icon */}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${danger ? "bg-red-500/15 border border-red-500/20" : "bg-violet-500/15 border border-violet-500/20"}`}>
          {danger ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3L16.5 15H1.5L9 3Z" stroke="#f87171" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 8v3M9 13v.5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="#a78bfa" strokeWidth="1.5" />
              <path d="M9 6v4M9 12v.5" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </div>

        {/* Text */}
        <h3
          className="text-white font-bold text-base mb-1"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {title}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white/50 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white/70 transition-all duration-150"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 active:scale-95 ${
              danger
                ? "text-white bg-gradient-to-r from-red-600 to-rose-600 shadow-[0_4px_16px_rgba(239,68,68,0.35)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.5)] hover:-translate-y-0.5"
                : "text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.5)] hover:-translate-y-0.5"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.93) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}