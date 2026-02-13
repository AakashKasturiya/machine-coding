import React, { useEffect, useMemo, useState, useRef } from "react";

export const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const inputRef = useRef(null);

  // Allowed file types and size (2MB)
  const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
  const maxSize = 2 * 1024 * 1024; // 2MB

  const isImage = file?.type?.startsWith("image/");
  const isPdf = file?.type === "application/pdf";

  const previewUrl = useMemo(() => {
    if (!file || !isImage) return null;
    return URL.createObjectURL(file);
  }, [file, isImage]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    // Validate file type
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Only PNG, JPEG, PDF allowed.");
      setFile(null);
      return;
    }

    // Validate file size
    if (selectedFile.size > maxSize) {
      setError("File too large. Max size is 2MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError("");
    setSuccess(false);
    setProgress(0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleRemove = () => {
    setFile(null);
    setError("");
    setSuccess(false);
    setUploading(false);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setSuccess(false);

    setProgress(0);
    const start = Date.now();
    const duration = 2000;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);
      if (nextProgress >= 100) {
        window.clearInterval(interval);
      }
    }, 50);

    // Mock API call
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      setProgress(100);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">File Upload</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Upload an image (PNG/JPEG) or a PDF. Max size: {(maxSize / (1024 * 1024)).toFixed(0)}MB.
              </p>
            </div>

            {file && (
              <button
                type="button"
                onClick={handleRemove}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Remove
              </button>
            )}
          </div>

          {/* Drag and Drop Area */}
          <div
            className={`mt-6 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                : "border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            } ${uploading ? "pointer-events-none opacity-80" : "cursor-pointer"}`}
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <i className="ri-upload-cloud-2-line text-2xl"></i>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-100">
              Drag & drop your file here
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">or click to browse</p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200">PNG</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200">JPG</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200">PDF</span>
            </div>

            <input
              type="file"
              ref={inputRef}
              className="hidden"
              accept="image/png,image/jpeg,application/pdf"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
              {error}
            </div>
          )}

          {/* File Info + Preview */}
          {file && (
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    <i className={isPdf ? "ri-file-pdf-2-line text-xl" : "ri-image-2-line text-xl"}></i>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{file.name}</p>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                      {(file.size / 1024).toFixed(2)} KB • {file.type || "unknown type"}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={uploading || success}
                    className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {uploading ? "Uploading..." : success ? "Uploaded" : "Upload"}
                  </button>

                  {(uploading || progress > 0) && (
                    <div className="mt-3">
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                        <div
                          className="h-2 rounded-full bg-blue-600 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">{progress}%</p>
                    </div>
                  )}

                  {success && (
                    <p className="mt-3 text-sm font-medium text-green-700 dark:text-green-300">
                      ✅ File uploaded successfully!
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Preview</p>
                <div className="mt-3 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
                  {isImage && previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="h-56 w-full object-contain"
                    />
                  ) : isPdf ? (
                    <div className="flex h-56 flex-col items-center justify-center p-6 text-center">
                      <i className="ri-file-pdf-2-line text-4xl text-gray-700 dark:text-gray-200" />
                      <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">PDF selected</p>
                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">Preview not available here</p>
                    </div>
                  ) : (
                    <div className="flex h-56 items-center justify-center p-6 text-sm text-gray-600 dark:text-gray-300">
                      No preview available
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

