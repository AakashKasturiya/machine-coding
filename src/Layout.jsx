import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { navItems } from './data/content'; // Adjust the path

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const typeOrder = ['easy', 'medium', 'advanced'];
  const typeLabel = (type) => {
    if (type === 'easy') return 'Easy';
    if (type === 'medium') return 'Medium';
    return 'Advanced';
  };

  const groupedNavItems = typeOrder
    .map((type) => ({
      type,
      items: navItems.filter((item) => item.type === type),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            type="button"
            className="h-10 w-10 rounded-xl border border-slate-200/80 bg-white/60 text-slate-700 hover:bg-white shadow-sm transition flex items-center justify-center"
            aria-label="Open sidebar"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <i className="ri-menu-line"></i>
          </button>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 shadow-sm flex items-center justify-center text-white">
              <i className="ri-code-ai-line"></i>
            </div>
            <div className="font-semibold bg-gradient-to-br from-indigo-500 to-sky-500 bg-clip-text text-transparent">
              React Lab
            </div>
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `h-10 w-10 rounded-xl border border-slate-200/80 bg-white/60 shadow-sm transition flex items-center justify-center ${
                isActive
                  ? 'text-white bg-gradient-to-r from-indigo-600 to-sky-600 border-transparent'
                  : 'text-slate-700 hover:bg-white'
              }`
            }
            aria-label="About"
          >
            <i className="ri-information-line" />
          </NavLink>
        </div>
      </header>

      {/* Mobile overlay */}
      {isMobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[1px]"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <nav
        className={`fixed md:static z-50 md:z-auto top-0 left-0 h-screen flex flex-col transition-all duration-300 border-r border-slate-200/70 bg-white/80 backdrop-blur-xl md:bg-white/70 md:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isSidebarOpen ? 'md:w-72 md:p-4' : 'md:w-16 md:px-2 md:py-4'} w-72 p-4`}
      >
        <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} mb-6`}>
          <div className={`flex items-center gap-3 ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 shadow-sm flex items-center justify-center text-white">
              <i className="ri-code-ai-line"></i>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-medium text-slate-500">React Machine Coding</div>
              <div className="text-lg font-semibold bg-gradient-to-br from-indigo-500 to-sky-500 bg-clip-text text-transparent">React Lab</div>
            </div>
          </div>

          <button
            type="button"
            className="md:hidden h-10 w-10 rounded-xl border border-slate-200/80 bg-white/60 text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm transition flex items-center justify-center"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <i className="ri-close-line"></i>
          </button>

          <button
            type="button"
            className="hidden md:flex h-10 w-10 rounded-xl border border-slate-200/80 bg-white/60 text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm transition items-center justify-center"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>

        <div className="sidebar-scroll min-h-0 flex-1 overflow-y-auto pr-1">
          {groupedNavItems.map((group) => (
            <div key={group.type} className="mb-4">
              {isSidebarOpen && (
                <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {typeLabel(group.type)}
                </div>
              )}
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `mb-1.5 px-3 py-2 rounded-xl flex items-center gap-2 transition ${
                      isSidebarOpen ? 'justify-start' : 'justify-center'
                    } ${isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                    }`
                  }
                  title={isSidebarOpen ? undefined : item.label}
                >
                  <span className="h-8 w-8 rounded-xl flex items-center justify-center bg-white/50 border border-slate-200/70 text-slate-600">
                    <i className={item.icon}></i>
                  </span>
                  {isSidebarOpen && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-1 min-w-0 p-4 md:p-6 pt-20 md:pt-6 transition-all duration-300">
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-3xl border border-slate-200/70 bg-white/70 backdrop-blur-xl shadow-sm p-6">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Desktop: About icon (top-right) */}
      <div className="hidden md:block fixed top-5 right-6 z-40">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `h-11 w-11 rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-xl shadow-sm transition flex items-center justify-center ${
              isActive
                ? 'text-white bg-gradient-to-r from-indigo-600 to-sky-600 border-transparent'
                : 'text-slate-700 hover:bg-white'
            }`
          }
          aria-label="About"
        >
          <i className="ri-information-line text-lg" />
        </NavLink>
      </div>
    </div>
  );
};
