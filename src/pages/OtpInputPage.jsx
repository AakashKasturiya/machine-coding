import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Introduction } from "../components/Pages/Introduction";
import { tasks } from "../data/content";
import { CodingPreview } from "../components/Pages/CodingPreview";
import { OtpInput } from "../components/OtpInput/OtpInput";

export const OtpInputPage = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const TasksData = tasks.filter((task) => task.path === path);

  const [otp, setOtp] = useState("");
  const [completed, setCompleted] = useState(null);

  return (
    <div className="max-w-6xl mx-auto bg-white-600 text-black">
      <Introduction TasksData={TasksData} />

      <div className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Numeric-only OTP with auto focus, backspace navigation, and paste-to-fill.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <OtpInput
              length={6}
              value={otp}
              onChange={setOtp}
              onComplete={(code) => setCompleted(code)}
              label="Enter OTP"
            />

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setOtp("");
                  setCompleted(null);
                }}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => setOtp("123456")}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Fill 123456
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">State</div>
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">Current: {otp || "(empty)"}</div>
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">Completed: {completed || "(not yet)"}</div>

            <div className="mt-6 text-sm font-medium text-gray-900 dark:text-gray-100">Uncontrolled</div>
            <div className="mt-3">
              <OtpInput length={4} defaultValue="12" label="4-digit OTP" />
            </div>
          </div>
        </div>
      </div>

      <CodingPreview TasksData={TasksData} />

      <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">🔍 Key Concepts Explained</h3>
        <ul className="list-disc px-6 space-y-2">
          <li className="text-gray-600 dark:text-gray-300">Store OTP as a string but render it as an array of digits.</li>
          <li className="text-gray-600 dark:text-gray-300">Auto-advance on input and go back on backspace when empty.</li>
          <li className="text-gray-600 dark:text-gray-300">Paste handling: distribute digits across inputs.</li>
          <li className="text-gray-600 dark:text-gray-300">Controlled vs uncontrolled component API for reusability.</li>
        </ul>
      </div>
    </div>
  );
};
