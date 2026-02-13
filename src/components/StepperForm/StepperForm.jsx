import React, { useMemo, useState } from "react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function StepperForm({
  steps,
  initialData,
  onSubmit,
  submitLabel = "Submit",
}) {
  const safeSteps = Array.isArray(steps) ? steps : [];
  const total = safeSteps.length;

  const [current, setCurrent] = useState(0);
  const [data, setData] = useState(initialData || {});
  const [errors, setErrors] = useState({});

  const currentStep = safeSteps[current];

  const progressPct = useMemo(() => {
    if (total <= 1) return 100;
    return Math.round((current / (total - 1)) * 100);
  }, [current, total]);

  const goTo = (idx) => setCurrent((prev) => clamp(idx, 0, Math.max(0, total - 1)));

  const validateStep = () => {
    if (!currentStep || typeof currentStep.validate !== "function") {
      setErrors({});
      return true;
    }

    const nextErrors = currentStep.validate(data) || {};
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    goTo(current + 1);
  };

  const back = () => {
    setErrors({});
    goTo(current - 1);
  };

  const submit = () => {
    if (!validateStep()) return;
    onSubmit?.(data);
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {currentStep ? currentStep.label : "Stepper"}
            </div>
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
              Step {current + 1} of {total}
            </div>
          </div>

          <div className="w-full sm:w-auto sm:min-w-[220px]">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
              <span>Progress</span>
              <span className="font-medium">{progressPct}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-blue-600 transition-[width] duration-300 ease-out"
                style={{ width: progressPct + "%" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          {currentStep && typeof currentStep.render === "function" ? (
            currentStep.render({ data, setData, errors })
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-300">No step content.</div>
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={current === 0}
            className="w-full sm:w-auto rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Back
          </button>

          <div className="flex w-full sm:w-auto items-center gap-2">
            {current < total - 1 ? (
              <button
                type="button"
                onClick={next}
                className="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                className="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                {submitLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
