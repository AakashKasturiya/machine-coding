import React from "react";

export const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto text-slate-900">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700">
              <i className="ri-information-line text-slate-600" />
              About
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
              React Lab — Machine Coding Practice
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
              This project is a curated collection of real interview-style machine-coding components built with React +
              TailwindCSS. The goal is to practice UI + logic patterns, build speed, and keep solutions consistent and
              reusable.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 text-sm text-slate-700">
              <i className="ri-reactjs-line text-indigo-600" />
              React
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 text-sm text-slate-700">
              <i className="ri-tailwind-css-line text-sky-600" />
              TailwindCSS
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 text-sm text-slate-700">
              <i className="ri-router-line text-emerald-600" />
              React Router
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white flex items-center justify-center shadow-sm">
            <i className="ri-code-s-slash-line" />
          </div>
          <div className="mt-3 text-base font-semibold">Interview-style components</div>
          <div className="mt-1 text-sm text-slate-600">
            Each page focuses on a real component you’ll build in interviews: pagination, infinite scroll, OTP input,
            seat booking, dynamic forms, and more.
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white flex items-center justify-center shadow-sm">
            <i className="ri-brush-line" />
          </div>
          <div className="mt-3 text-base font-semibold">Consistent UI system</div>
          <div className="mt-1 text-sm text-slate-600">
            Clean spacing, responsive layouts, dark mode support, and reusable wrappers so everything looks consistent.
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-5">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-500 to-pink-500 text-white flex items-center justify-center shadow-sm">
            <i className="ri-lightbulb-flash-line" />
          </div>
          <div className="mt-3 text-base font-semibold">Learn the patterns</div>
          <div className="mt-1 text-sm text-slate-600">
            Each component reinforces core patterns: controlled inputs, memoized derived state, async flows, UI state
            machines, and accessibility basics.
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white/70 p-5">
        <div className="text-base font-semibold">What you’ll practice here</div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200/70 bg-white/60 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <i className="ri-layout-grid-line text-sky-600" />
              Layout + Responsiveness
            </div>
            <div className="mt-1 text-sm text-slate-600">Mobile-first UI, grid/flex wrapping, and overflow handling.</div>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-white/60 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <i className="ri-database-2-line text-indigo-600" />
              State Management
            </div>
            <div className="mt-1 text-sm text-slate-600">Hooks, derived state, memoization, and localStorage.</div>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-white/60 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <i className="ri-loader-4-line text-emerald-600" />
              Async UI
            </div>
            <div className="mt-1 text-sm text-slate-600">Pagination, infinite scroll, optimistic updates, loading states.</div>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-white/60 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <i className="ri-checkbox-circle-line text-amber-600" />
              Validation
            </div>
            <div className="mt-1 text-sm text-slate-600">Per-step validation, form UX, and error messaging.</div>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-white/60 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <i className="ri-shield-check-line text-slate-700" />
              Accessibility
            </div>
            <div className="mt-1 text-sm text-slate-600">Keyboard navigation, focus styles, and ARIA labels.</div>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-white/60 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <i className="ri-magic-line text-pink-600" />
              UI Polish
            </div>
            <div className="mt-1 text-sm text-slate-600">Glassy effects, subtle shadows, and consistent components.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
