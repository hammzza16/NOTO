import React from "react";
import "./summaryModal.css";
export default function SummaryModal({
  isOpen,
  summary,
  loading,
  error,
  onClose,
}) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>Note Summary</h2>
        {loading && <p>Generating summary...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <>
            <p>{summary}</p>
            <button onClick={() => navigator.clipboard.writeText(summary)}>
              Copy
            </button>
          </>
        )}
      </div>
    </div>
  );
}
