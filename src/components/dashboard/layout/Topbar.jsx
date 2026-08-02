import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Topbar = ({ title, onLogout }) => {
  const navigate = useNavigate();
 
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }
    document.cookie = "auth_user=; path=/; max-age=0";
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-sm text-cyan-400">Facial Recognition Console</p>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400">
          Home
        </Link>
        <Link to="/dashboard/settings" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400">
          ⚙ Settings
        </Link>
        <button
          onClick={handleLogout}
          className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
