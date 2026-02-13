import React, { useEffect, useMemo, useRef, useState } from "react";

function normalizeTag(tag) {
  return String(tag || "").trim();
}

export function TagInput({
  value,
  defaultValue = [],
  onChange,
  placeholder = "Type and press Enter…",
  allowDuplicates = false,
  maxTags,
  label = "Tags",
  disabled = false,
}) {
  const isControlled = Array.isArray(value);
  const [internalTags, setInternalTags] = useState(defaultValue);
  const tags = isControlled ? value : internalTags;

  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isControlled) return;
    setInternalTags(value);
  }, [isControlled, value]);

  const atLimit = useMemo(() => {
    if (typeof maxTags !== "number") return false;
    return tags.length >= maxTags;
  }, [maxTags, tags.length]);

  const commitTags = (next) => {
    if (!isControlled) setInternalTags(next);
    onChange?.(next);
  };

  const removeAt = (idx) => {
    const next = tags.filter((_, i) => i !== idx);
    commitTags(next);
  };

  const addTag = (raw) => {
    if (disabled) return;
    if (atLimit) return;

    const tag = normalizeTag(raw);
    if (!tag) return;

    if (!allowDuplicates) {
      const exists = tags.some((t) => String(t).toLowerCase() === tag.toLowerCase());
      if (exists) return;
    }

    commitTags([...tags, tag]);
  };

  const addFromInput = () => {
    const raw = input;
    setInput("");
    addTag(raw);
  };

  const addManyFromInput = (text) => {
    const parts = String(text || "")
      .split(",")
      .map((p) => normalizeTag(p))
      .filter(Boolean);

    if (!parts.length) return;

    let next = tags.slice();
    for (const p of parts) {
      if (typeof maxTags === "number" && next.length >= maxTags) break;
      if (!allowDuplicates) {
        const exists = next.some((t) => String(t).toLowerCase() === p.toLowerCase());
        if (exists) continue;
      }
      next.push(p);
    }

    commitTags(next);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</div>
        {typeof maxTags === "number" && (
          <div className="text-xs text-gray-600 dark:text-gray-300">
            {tags.length}/{maxTags}
          </div>
        )}
      </div>

      <div
        className={
          "mt-3 flex flex-wrap items-center gap-2 rounded-2xl border bg-white p-3 dark:bg-gray-900 " +
          (disabled
            ? "border-gray-200 opacity-75 dark:border-gray-800"
            : "border-gray-300 dark:border-gray-700")
        }
        onClick={() => inputRef.current?.focus?.()}
      >
        {tags.map((t, idx) => (
          <span
            key={t + "-" + idx}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-950/30 dark:text-gray-100"
          >
            <span className="max-w-[180px] truncate">{t}</span>
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeAt(idx);
                }}
                className="rounded-full p-1 text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label={"Remove tag " + t}
              >
                <i className="ri-close-line" />
              </button>
            )}
          </span>
        ))}

        <input
          ref={inputRef}
          value={input}
          disabled={disabled || atLimit}
          placeholder={atLimit ? "Tag limit reached" : placeholder}
          onChange={(e) => {
            const v = e.target.value;
            if (v.includes(",")) {
              addManyFromInput(v);
              setInput("");
              return;
            }
            setInput(v);
          }}
          onKeyDown={(e) => {
            if (disabled) return;

            if (e.key === "Enter") {
              e.preventDefault();
              addFromInput();
              return;
            }

            if (e.key === "Backspace") {
              if (input.length === 0 && tags.length > 0) {
                e.preventDefault();
                removeAt(tags.length - 1);
              }
            }
          }}
          className="min-w-[140px] flex-1 bg-transparent px-2 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
        />
      </div>

      <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
        Tip: Use <span className="font-medium">Enter</span> or <span className="font-medium">comma</span> to add.
      </div>
    </div>
  );
}
