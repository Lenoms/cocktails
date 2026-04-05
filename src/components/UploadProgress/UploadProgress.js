import React, { useEffect, useState } from "react";
import "./UploadProgress.css";

function UploadProgress({ durationMs = 5000 }) {
  const [progress, setProgress] = useState(0);
  const label = "Mixing your drink...";

  useEffect(() => {
    const startTime = Date.now();
    const tick = 50;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const next = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(next);
      if (next >= 100) {
        clearInterval(interval);
      }
    }, tick);

    return () => {
      clearInterval(interval);
    };
  }, [durationMs]);

  return (
    <div className="upload-progress-wrapper">
      <div className="upload-progress-header">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="upload-progress-bar">
        <div
          className="upload-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default UploadProgress;
