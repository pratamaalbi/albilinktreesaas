export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 mb-3 transition-colors duration-150 hover:bg-white/[0.07] ${className}`}
    >
      {children}
    </div>
  );
}