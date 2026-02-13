import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "../../context/ThemeContext";
import { useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';  // We’ll use react-toastify

export const CodingPreview = ({ TasksData }) => {
  const { theme } = useTheme();
  const location = useLocation();

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const isThemeTogglePage = location.pathname === "/theme-toggle";

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const sync = () => setIsSmallScreen(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);



  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      {TasksData.map((item, i) => (
        <div key={i}>
          <div className="prose max-w-none mt-10 dark:prose-invert">
            {item.solution.map((solution, index) => {
              const cardClasses = isThemeTogglePage
                ? `${theme === "light"
                  ? "bg-white text-black"
                  : "bg-gray-600 text-white"
                }`
                : "bg-white text-black";

              return (
                <div key={index}>
                  <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">{solution.MainHeading}</h2>
                  <h1 className="text-base sm:text-lg font-semibold mb-2">{solution.heading}</h1>
                  <p className="mb-2 text-gray-600 dark:text-gray-300">{solution.description}</p>
                  {solution.options && <ul className="list-disc px-6 mb-6">
                    {solution.options.map((option, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-300 mb-2">{option}</li>
                    ))}
                  </ul>}
                  <div
                    key={index}
                    className={`mb-2 ${cardClasses} p-0 sm:p-6 rounded-2xl shadow-sm mb-6 overflow-hidden`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2 ml-2">
                          Code
                        </h3>
                        <p
                          className={`mb-2 ${isThemeTogglePage
                            ? theme === "light"
                              ? "text-black"
                              : "text-white"
                            : "text-black"
                            }`}
                        >
                          {solution.paragraph}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopy(solution.code)}
                        className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-900 rounded-xl border border-gray-200/70 bg-white/60 hover:bg-white shadow-sm transition flex items-center justify-center space-x-2"
                      >
                        <i className="ri-clipboard-line"></i>
                        <span>Copy Code</span>
                      </button>
                    </div>
                    <Editor
                      height={isSmallScreen ? '220px' : '320px'}
                      defaultLanguage="javascript"
                      defaultValue={solution.code}
                      theme={theme === 'dark' ? 'vs-dark' : 'light'}
                      options={{
                        readOnly: true,
                        fontSize: isSmallScreen ? 12 : 14,
                        wordWrap: 'on',
                        minimap: { enabled: false },
                        scrollbar: {
                          verticalScrollbarSize: isSmallScreen ? 6 : 10,
                          horizontalScrollbarSize: isSmallScreen ? 6 : 10,
                        },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
