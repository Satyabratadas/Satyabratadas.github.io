import React from 'react';

export default function AuroraBackground() {
  return (
    <div className="aurora-container" aria-hidden="true">
      {/* Dynamic drifting gradient mesh blobs */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />

      {/* Perspective masked grid overlay */}
      <div className="aurora-grid" />

      {/* Subtle vignette radial mask */}
      <div className="aurora-vignette" />
    </div>
  );
}
