import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {Panel} from "./Panel";// form navigate the previous panel

const DashboardLayout = ({ title, children, onLogout }) => (
  <div className="min-h-screen bg-slate-950 text-white">
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar title={title} onLogout={onLogout} />
        <Panel />
        <main className="p-6">{children}</main>
      </div>
    </div>
  </div>
);

export default DashboardLayout;
