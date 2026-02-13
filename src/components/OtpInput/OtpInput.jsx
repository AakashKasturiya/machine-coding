import React, { useEffect, useMemo, useRef, useState } from "react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function onlyDigits(str) {
  return String(str || "").replace(/\D/g, "");
}

function splitToDigits(value, length) {
  const clean = onlyDigits(value);
  const arr = Array.from({ length }, (_, i) => clean[i] || "");
  return arr;
}

export function OtpInput({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  autoFocus = true,
  disabled = false,
  label = "OTP",
}) {
  const isControlled = typeof value === "string";

  const [internal, setInternal] = useState(() => splitToDigits(defaultValue, length));
  const digits = isControlled ? splitToDigits(value, length) : internal;

  const refs = useRef([]);

  useEffect(() => {
    if (!autoFocus) return;
    if (disabled) return;

    const first = refs.current[0];
    first?.focus?.();
  }, [autoFocus, disabled]);

  useEffect(() => {
    if (!isControlled) return;
    setInternal(splitToDigits(value, length));
  }, [isControlled, length, value]);

  const otp = useMemo(() => digits.join(""), [digits]);

  const commit = (nextDigits, focusIndex) => {
    const next = nextDigits.slice(0, length);

    if (!isControlled) setInternal(next);

    const nextOtp = next.join("");
    onChange?.(nextOtp);

    if (next.every((d) => d !== "")) onComplete?.(nextOtp);

    if (typeof focusIndex === "number") {
      const idx = clamp(focusIndex, 0, length - 1);
      refs.current[idx]?.focus?.();
      refs.current[idx]?.select?.();
    }
  };

  const setAt = (index, char) => {
    const nextDigits = [...digits];
    nextDigits[index] = char;
    commit(nextDigits, char ? index + 1 : index);
  };

  const onPasteAt = (index, text) => {
    const clean = onlyDigits(text);
    if (!clean) return;

    const nextDigits = [...digits];
    let i = index;
    for (const c of clean) {
      if (i >= length) break;
      nextDigits[i] = c;
      i += 1;
    }

    commit(nextDigits, Math.min(i, length - 1));
  };

  return (
    <div className="w-full">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</div>
      <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
        {digits.map((d, idx) => (
          <input
            key={idx}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            value={d}
            disabled={disabled}
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={1}
            onChange={(e) => {
              const v = onlyDigits(e.target.value);
              const char = v ? v[v.length - 1] : "";
              setAt(idx, char);
            }}
            onKeyDown={(e) => {
              if (disabled) return;

              if (e.key === "Backspace") {
                if (digits[idx]) {
                  e.preventDefault();
                  setAt(idx, "");
                } else {
                  e.preventDefault();
                  commit([...digits], idx - 1);
                }
                return;
              }

              if (e.key === "ArrowLeft") {
                e.preventDefault();
                commit([...digits], idx - 1);
                return;
              }

              if (e.key === "ArrowRight") {
                e.preventDefault();
                commit([...digits], idx + 1);
                return;
              }

              if (e.key === "Home") {
                e.preventDefault();
                commit([...digits], 0);
                return;
              }

              if (e.key === "End") {
                e.preventDefault();
                commit([...digits], length - 1);
              }
            }}
            onPaste={(e) => {
              e.preventDefault();
              onPasteAt(idx, e.clipboardData.getData("text"));
            }}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl border border-gray-300 bg-white text-center text-base sm:text-lg font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            aria-label={"OTP digit " + (idx + 1)}
          />
        ))}
      </div>

      <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Value: <span className="font-medium">{otp || "(empty)"}</span>
      </div>
    </div>
  );
}
