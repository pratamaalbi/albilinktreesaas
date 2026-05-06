export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.55)] hover:-translate-y-0.5",
    ghost:
      "text-white/60 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white",
    danger:
      "text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin" width="13" height="13" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" strokeLinecap="round" />
          </svg>
          Memproses...
        </>
      ) : (
        children
      )}
    </button>
  );
}