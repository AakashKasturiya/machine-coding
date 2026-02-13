import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { StepperForm } from "../components/StepperForm/StepperForm";

export const StepperPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  const [submitted, setSubmitted] = useState(null);

  const steps = useMemo(
    () => [
      {
        label: "Profile",
        validate: (data) => {
          const errors = {};
          if (!data.fullName || data.fullName.trim().length < 2) errors.fullName = "Name is required";
          if (!data.email || !String(data.email).includes("@")) errors.email = "Valid email required";
          return errors;
        },
        render: ({ data, setData, errors }) => (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Full name</div>
              <input
                value={data.fullName || ""}
                onChange={(e) => setData((p) => ({ ...p, fullName: e.target.value }))}
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                placeholder="John Doe"
              />
              {errors.fullName && (
                <div className="mt-2 text-xs text-red-600 dark:text-red-400">{errors.fullName}</div>
              )}
            </div>

            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</div>
              <input
                value={data.email || ""}
                onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                placeholder="john@example.com"
              />
              {errors.email && (
                <div className="mt-2 text-xs text-red-600 dark:text-red-400">{errors.email}</div>
              )}
            </div>
          </div>
        ),
      },
      {
        label: "Address",
        validate: (data) => {
          const errors = {};
          if (!data.city || data.city.trim().length < 2) errors.city = "City is required";
          if (!data.zip || String(data.zip).trim().length < 4) errors.zip = "Zip is required";
          return errors;
        },
        render: ({ data, setData, errors }) => (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">City</div>
              <input
                value={data.city || ""}
                onChange={(e) => setData((p) => ({ ...p, city: e.target.value }))}
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                placeholder="Mumbai"
              />
              {errors.city && (
                <div className="mt-2 text-xs text-red-600 dark:text-red-400">{errors.city}</div>
              )}
            </div>

            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Zip</div>
              <input
                value={data.zip || ""}
                onChange={(e) => setData((p) => ({ ...p, zip: e.target.value }))}
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                placeholder="400001"
              />
              {errors.zip && (
                <div className="mt-2 text-xs text-red-600 dark:text-red-400">{errors.zip}</div>
              )}
            </div>
          </div>
        ),
      },
      {
        label: "Review",
        validate: () => ({}),
        render: ({ data }) => (
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Review your data</div>
            <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-950/30 dark:text-gray-200">
              <div>Full name: {data.fullName || "-"}</div>
              <div className="mt-1">Email: {data.email || "-"}</div>
              <div className="mt-1">City: {data.city || "-"}</div>
              <div className="mt-1">Zip: {data.zip || "-"}</div>
            </div>
            <div className="mt-4 text-xs text-gray-600 dark:text-gray-300">
              Click Submit to finish.
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="max-w-6xl mx-auto bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Multi-step form with per-step validation, Back/Next, and progress indicator.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <StepperForm
              steps={steps}
              initialData={{ fullName: "", email: "", city: "", zip: "" }}
              onSubmit={(data) => setSubmitted(data)}
              submitLabel="Submit"
            />
          </div>

          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Submitted</div>
            <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-950/30 dark:text-gray-200">
              {submitted ? JSON.stringify(submitted, null, 2) : "Not submitted yet"}
            </div>
          </div>
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Store step index in state and render the current step’s UI.</li>
          <li className="text-gray-600 dark:text-gray-300">Per-step validation blocks navigation and shows inline errors.</li>
          <li className="text-gray-600 dark:text-gray-300">Keep form data in one object so it persists across steps.</li>
          <li className="text-gray-600 dark:text-gray-300">Progress indicator based on current step / total steps.</li>
        </ul>
      </div>
    </div>
  );
};
