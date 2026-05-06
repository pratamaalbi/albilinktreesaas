export default function Input({
  placeholder,
  onChange,
  onKeyDown,
  type = "text",
  value,
  label,
  icon,
  error,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-white/50 text-xs font-medium tracking-wide uppercase">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className={`
            w-full py-3 rounded-xl bg-white/5 border text-white text-sm
            placeholder-white/25 outline-none transition-all duration-150
            ${icon ? "pl-9 pr-4" : "px-4"}
            ${error
              ? "border-red-500/40 focus:border-red-500/60"
              : "border-white/10 focus:border-violet-500/60 focus:bg-white/[0.07]"
            }
          `}
        />
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-red-400 text-xs mt-0.5">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 4v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}