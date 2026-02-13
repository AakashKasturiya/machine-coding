import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { ProgressBar } from "../components/ProgressBar/ProgressBar";

export const ProgressBarPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  const [value, setValue] = useState(45);
  const [targetValue, setTargetValue] = useState(75);
  const [variant, setVariant] = useState("blue");
  const [size, setSize] = useState("md");
  const [animated, setAnimated] = useState(true);

  const rafIdRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const animateTo = (next, durationMs = 500) => {
    const to = Math.max(0, Math.min(100, next));

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

    const from = value;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (to - from) * eased;
      setValue(Math.round(v));

      if (t < 1) rafIdRef.current = requestAnimationFrame(tick);
      else rafIdRef.current = null;
    };

    rafIdRef.current = requestAnimationFrame(tick);
  };

  const variants = useMemo(() => ["blue", "green", "amber", "red"], []);
  const sizes = useMemo(() => ["sm", "md", "lg"], []);

  return (
    <div className="max-w-6xl mx-auto bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Control the value with a slider. Try different sizes and color variants.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <ProgressBar
              label="Upload progress"
              value={value}
              max={100}
              variant={variant}
              size={size}
              animated={animated}
            />

            <div className="mt-6">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Target value</div>
              <input
                type="range"
                min={0}
                max={100}
                value={targetValue}
                onChange={(e) => setTargetValue(Number(e.target.value))}
                className="mt-3 w-full"
              />

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => animateTo(targetValue)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Animate
                </button>
                <button
                  type="button"
                  onClick={() => setTargetValue((v) => Math.min(100, v + 10))}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  +10 Target
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
                    rafIdRef.current = null;
                    setValue(0);
                    setTargetValue(0);
                  }}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Controls</div>

            <div className="mt-4">
              <div className="text-xs text-gray-600 dark:text-gray-300">Variant</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVariant(v)}
                    className={
                      "rounded-lg border px-3 py-2 text-sm transition-colors dark:border-gray-700 " +
                      (variant === v
                        ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-200"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800")
                    }
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-xs text-gray-600 dark:text-gray-300">Size</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={
                      "rounded-lg border px-3 py-2 text-sm transition-colors dark:border-gray-700 " +
                      (size === s
                        ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-200"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800")
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-5 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
              <input
                type="checkbox"
                checked={animated}
                onChange={(e) => setAnimated(e.target.checked)}
              />
              Animated
            </label>
          </div>
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Compute percentage and clamp between 0 and 100.</li>
          <li className="text-gray-600 dark:text-gray-300">Drive UI via props: size/variant/animation.</li>
          <li className="text-gray-600 dark:text-gray-300">Accessibility: use <code>role=progressbar</code> with aria values.</li>
          <li className="text-gray-600 dark:text-gray-300">Smooth transitions by animating the fill width.</li>
        </ul>
      </div>
    </div>
  );
};
