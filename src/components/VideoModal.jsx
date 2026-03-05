import React from "react";

export function VideoModal({ open, onClose, youtube, src, poster = "" }) {
  function getYouTubeId(input = "") {
    if (!input) return "";
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
    const m =
      input.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/) ||
      input.match(/^([a-zA-Z0-9_-]{11})$/);
    return m ? m[1] : "";
  }

  const ytId = getYouTubeId(youtube);
  const ytSrc = ytId
    ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : "";

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl rounded-2xl bg-black overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {ytSrc ? (
            <iframe src={ytSrc} className="absolute inset-0 w-full h-full" allow="autoplay; fullscreen" allowFullScreen />
          ) : (
            <video src={src} poster={poster} className="absolute inset-0 w-full h-full object-contain" controls autoPlay playsInline />
          )}
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-black/90">
          <span className="text-sm text-white/70">How it works video</span>
          <button onClick={onClose} className="text-white/60 hover:text-white text-sm">✕</button>
        </div>
      </div>
    </div>
  );
}
