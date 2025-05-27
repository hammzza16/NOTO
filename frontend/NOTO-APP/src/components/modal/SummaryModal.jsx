import React from "react";

export default function SummaryModal({
  isOpen,
  summary,
  loading,
  error,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-lg shadow-lg p-6">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold mb-4 text-center">Note Summary</h2>

        {/* Modal Content */}
        {loading && <p className="text-gray-600">Generating...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <p className="text-gray-700 whitespace-pre-wrap mb-4">{summary}</p>
            <button
              onClick={() => navigator.clipboard.writeText(summary)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
            >
              Copy
            </button>
          </>
        )}
      </div>
    </div>
  );
}
