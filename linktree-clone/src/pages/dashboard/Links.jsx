import { useEffect, useState } from "react";
import API from "../../api/axios";
import ConfirmModal from "../../components/ui/ConfirmModal";

export default function Links() {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Confirm modal state
  const [modal, setModal] = useState({ open: false, linkId: null, linkTitle: "" });

  const getLinks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/links");
      setLinks(res.data);
    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const addLink = async () => {
    if (!title.trim() || !url.trim()) {
      setError("Title dan URL wajib diisi.");
      return;
    }
    setError("");
    setAdding(true);
    try {
      await API.post("/links", { title, url });
      setTitle("");
      setUrl("");
      getLinks();
    } catch (err) {
      setError(err.response?.data?.msg || "Gagal menambahkan link.");
    } finally {
      setAdding(false);
    }
  };

  // Step 1: buka modal konfirmasi
  const confirmDelete = (id, linkTitle) => {
    setModal({ open: true, linkId: id, linkTitle });
  };

  // Step 2: eksekusi hapus setelah konfirmasi
  const deleteLink = async () => {
    const id = modal.linkId;
    setModal({ open: false, linkId: null, linkTitle: "" });
    setDeletingId(id);
    try {
      await API.delete(`/links/${id}`);
      setLinks((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setDeletingId(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addLink();
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      {/* Confirm delete modal */}
      <ConfirmModal
        isOpen={modal.open}
        danger
        title="Hapus Link?"
        message={`Link "${modal.linkTitle}" akan dihapus permanen dan tidak bisa dikembalikan.`}
        confirmLabel="Ya, hapus"
        onConfirm={deleteLink}
        onCancel={() => setModal({ open: false, linkId: null, linkTitle: "" })}
      />

      <div className="flex flex-col gap-6">

        {/* Add link form */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 flex flex-col gap-4">
          <h2 className="text-base font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            Tambah Link Baru
          </h2>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 4v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          {/* Title input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/50 text-xs font-medium tracking-wide uppercase">Title</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 4h11M2 7.5h7M2 11h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Nama link kamu"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-violet-500/60 focus:bg-white/[0.07] transition-all duration-150"
              />
            </div>
          </div>

          {/* URL input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/50 text-xs font-medium tracking-wide uppercase">URL</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M6.5 8.5a3.5 3.5 0 005 0l2-2a3.536 3.536 0 00-5-5l-1 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M8.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.536 3.536 0 005 5l1-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                type="url"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 outline-none focus:border-violet-500/60 focus:bg-white/[0.07] transition-all duration-150"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={addLink}
            disabled={adding}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.55)] hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-150"
          >
            {adding ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" strokeLinecap="round" />
                </svg>
                Menyimpan...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Tambah Link
              </>
            )}
          </button>
        </div>

        {/* Links list */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              Link Kamu
            </h2>
            <span className="text-xs text-white/30 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              {links.length} link
            </span>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-2xl bg-white/[0.04] border border-white/10 animate-pulse" />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && links.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 rounded-2xl border border-dashed border-white/10 text-center">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M8 11a4 4 0 006 0l2.5-2.5a4.243 4.243 0 00-6-6L9 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M10 7a4 4 0 00-6 0L1.5 9.5a4.243 4.243 0 006 6L9 14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-white/40 text-sm font-medium">Belum ada link</p>
              <p className="text-white/20 text-xs mt-1">Tambahkan link pertama kamu di atas</p>
            </div>
          )}

          {/* Link cards */}
          {!loading && links.map((l, index) => (
            <div
              key={l.id}
              className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-150"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {/* Drag handle */}
              <div className="flex-shrink-0 text-white/15 group-hover:text-white/30 transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="5" cy="4" r="1" fill="currentColor" />
                  <circle cx="9" cy="4" r="1" fill="currentColor" />
                  <circle cx="5" cy="7" r="1" fill="currentColor" />
                  <circle cx="9" cy="7" r="1" fill="currentColor" />
                  <circle cx="5" cy="10" r="1" fill="currentColor" />
                  <circle cx="9" cy="10" r="1" fill="currentColor" />
                </svg>
              </div>

              {/* Link icon */}
              <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M6 8a3 3 0 004.243 0l1.5-1.5a3.182 3.182 0 00-4.5-4.5L6.5 3.25" stroke="#a78bfa" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M8 6a3 3 0 00-4.243 0L2.257 7.5a3.182 3.182 0 004.5 4.5L7.5 10.75" stroke="#a78bfa" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium leading-none mb-0.5 truncate">{l.title}</p>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 text-xs hover:text-violet-400 transition-colors truncate block"
                >
                  {l.url}
                </a>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  title="Buka link"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <button
                  onClick={() => confirmDelete(l.id, l.title)}
                  disabled={deletingId === l.id}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-40"
                  title="Hapus link"
                >
                  {deletingId === l.id ? (
                    <svg className="animate-spin" width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1.5 3h9M4 3V2h4v1M5 5.5v3M7 5.5v3M2 3l.75 7.5h6.5L10 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}