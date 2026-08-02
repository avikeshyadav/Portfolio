import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dashboardNavItems } from "../../Data/dashboardNavItems";

const Sidebar = () => {
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState("");
  const isActive = (path) =>
    path === "/dashboard"
      ? location.pathname === path
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  useEffect(() => {
    const matchedItem = dashboardNavItems.find((item) =>
      item.subItems?.some((subItem) => subItem.path === location.pathname),
    );

    if (matchedItem) {
      setOpenGroup(matchedItem.label);
    } else if (!location.pathname.startsWith("/dashboard/students")) {
      setOpenGroup("");
    }
  }, [location.pathname]);

  const toggleGroup = (label) => {
    setOpenGroup((prev) => (prev === label ? "" : label));
  };

  return (
    <aside className="hidden min-h-screen w-72 border-r border-slate-800 bg-slate-950/90 p-6 lg:block">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Dashboard</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Student Vision</h3>
      </div>
      <nav className="space-y-2">
        {dashboardNavItems.map((item) => {
          const active = isActive(item.path);
          const showSubItems = item.subItems?.length && openGroup === item.label;

          return (
            <div key={item.label}>
              <div className="flex items-center gap-2">
                <Link
                  to={item.path}
                  onClick={() => item.subItems?.length && toggleGroup(item.label)}
                  className={`flex-1 rounded-xl border px-4 py-3 text-left text-sm transition ${
                    active
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                      : "border-transparent text-slate-300 hover:border-cyan-500 hover:bg-slate-900 hover:text-cyan-400"
                  }`}
                >
                  {item.label}
                </Link>
                {item.subItems?.length ? (
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.label)}
                    className="rounded-lg border border-slate-700 px-2 py-2 text-sm text-slate-300 hover:border-cyan-500 hover:text-cyan-400"
                  >
                    {showSubItems ? "−" : "+"}
                  </button>
                ) : null}
              </div>
              {showSubItems ? (
                <div className="ml-4 mt-2 space-y-1">
                  {item.subItems.map((subItem) => {
                    const subActive = location.pathname === subItem.path;
                    return (
                      <Link
                        key={subItem.label}
                        to={subItem.path}
                        className={`block rounded-lg px-3 py-2 text-sm transition ${
                          subActive
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "text-slate-400 hover:bg-slate-900 hover:text-cyan-400"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
      <div className="mt-10 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
        <p className="text-sm font-semibold text-cyan-400">Live status</p>
        <p className="mt-2 text-sm text-slate-300">128 students monitored and 93% face match accuracy.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
