import React, { useState } from "react";

export default function Logo({ className = "h-8 md:h-9 lg:h-10" }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`inline-flex items-center ${className}`}>
      {!failed ? (
        <img src="/media/nobi-logo@2x.png" alt="Nobi" className="h-full w-auto" onError={() => setFailed(true)} />
      ) : (
        <svg viewBox="0 0 100 28" fill="none" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="22" fontSize="24" fontWeight="700" fontFamily="system-ui, sans-serif" fill="currentColor">
            nobi
          </text>
        </svg>
      )}
    </span>
  );
}
