from pathlib import Path
import json
import textwrap

root = Path(__file__).resolve().parents[1]

# Frontend dashboard structure
frontend_root = root / 'src' / 'components' / 'dashboard'
(frontend_root / 'layout').mkdir(parents=True, exist_ok=True)
(frontend_root / 'modules').mkdir(parents=True, exist_ok=True)

components = [
    ('StudentRecordsCard', 'Student Records', 'Manage student profiles, admissions, and academic records.'),
    ('FaceEnrollmentPanel', 'Face Enrollment', 'Capture and verify biometric samples for new student onboarding.'),
    ('AttendanceMonitor', 'Attendance Monitor', 'Track facial attendance and punctuality trends.'),
    ('AccessControlBoard', 'Access Control', 'Grant or deny campus entry through facial verification.'),
    ('IdentityAuditTrail', 'Identity Audit Trail', 'Review verification logs and identity changes.'),
    ('VisitorCheckDesk', 'Visitor Check Desk', 'Register visitors and manage temporary access.'),
    ('AlertCenter', 'Alert Center', 'View suspicious activity and priority alerts.'),
    ('ReportBuilder', 'Report Builder', 'Generate institutional and security performance reports.'),
    ('WatchlistManager', 'Watchlist Manager', 'Flag students or visitors for manual review.'),
    ('DeviceHealthPanel', 'Device Health', 'Monitor cameras, scanners, and connectivity health.'),
    ('EnrollmentQueue', 'Enrollment Queue', 'Prioritize student onboarding and face capture tasks.'),
    ('ConsentManager', 'Consent Manager', 'Track permissions, policy approvals, and data retention.'),
    ('RecordArchive', 'Record Archive', 'Search historical student records and verification history.'),
    ('FaceSearchBar', 'Face Search', 'Search students using image-matching and metadata.'),
    ('BiometricSyncStatus', 'Biometric Sync', 'Monitor synchronization with student information systems.'),
    ('IncidentReviewBoard', 'Incident Review', 'Investigate recognition failures and access exceptions.'),
    ('CampusAccessMap', 'Campus Access Map', 'Track access zones and movement activity in real time.'),
    ('PrivacyShield', 'Privacy Shield', 'Ensure privacy rules, retention policies, and compliance controls.'),
    ('AdminCommandCenter', 'Admin Command Center', 'Provide administrators with a live control-center overview.'),
]

for name, title, desc in components:
    module_dir = frontend_root / 'modules' / name
    module_dir.mkdir(parents=True, exist_ok=True)
    (module_dir / 'index.jsx').write_text(textwrap.dedent(f'''\
    import React from "react";

    const {name} = () => (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-400">
            Live
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-400">{desc}</p>
      </div>
    );

    export default {name};
    '''))

(frontend_root / 'layout' / 'Topbar.jsx').write_text(textwrap.dedent('''\
import React from "react";
import { Link } from "react-router-dom";

const Topbar = ({ title }) => (
  <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-6 py-4 backdrop-blur">
    <div>
      <p className="text-sm text-cyan-400">Facial Recognition Console</p>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>
    <div className="flex items-center gap-3">
      <Link to="/" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400">
        Home
      </Link>
      <button className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600">
        Sync Now
      </button>
    </div>
  </header>
);

export default Topbar;
'''))

(frontend_root / 'layout' / 'Sidebar.jsx').write_text(textwrap.dedent('''\
import React from "react";

const navItems = ["Overview", "Students", "Face Enrollment", "Attendance", "Access Control", "Alerts", "Reports", "Settings"];

const Sidebar = () => (
  <aside className="hidden min-h-screen w-72 border-r border-slate-800 bg-slate-950/90 p-6 lg:block">
    <div className="mb-8">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Dashboard</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Student Vision</h3>
    </div>
    <nav className="space-y-2">
      {navItems.map((item) => (
        <button
          key={item}
          className="flex w-full items-center rounded-xl border border-transparent px-4 py-3 text-left text-sm text-slate-300 transition hover:border-cyan-500 hover:bg-slate-900 hover:text-cyan-400"
        >
          {item}
        </button>
      ))}
    </nav>
    <div className="mt-10 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
      <p className="text-sm font-semibold text-cyan-400">Live status</p>
      <p className="mt-2 text-sm text-slate-300">128 students monitored and 93% face match accuracy.</p>
    </div>
  </aside>
);

export default Sidebar;
'''))

(frontend_root / 'layout' / 'DashboardLayout.jsx').write_text(textwrap.dedent('''\
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ title, children }) => (
  <div className="min-h-screen bg-slate-950 text-white">
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  </div>
);

export default DashboardLayout;
'''))

exports = []
for name, _, _ in components:
    exports.append(f'export {{ default as {name} }} from "./{name}";')
(frontend_root / 'modules' / 'index.js').write_text('\n'.join(exports) + '\n')

# Dashboard page
(page_file := root / 'src' / 'pages' / 'DashboardPage.jsx').write_text(textwrap.dedent('''\
import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/layout/DashboardLayout";
import * as modules from "../components/dashboard/modules";

const DashboardPage = () => {
  const [summary, setSummary] = useState({ totalStudents: 0, activeToday: 0, verifiedMatches: 0, alerts: 0 });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard");
        const payload = await response.json();
        setSummary(payload.summary);
        setStudents(payload.students);
      } catch (error) {
        console.error("Dashboard fetch failed", error);
      }
    };

    loadDashboard();
  }, []);

  const componentEntries = Object.entries(modules);

  return (
    <DashboardLayout title="Student Recognition Management">
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-sm text-slate-400">Total Students</p>
            <p className="mt-2 text-3xl font-semibold text-white">{summary.totalStudents}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-sm text-slate-400">Active Today</p>
            <p className="mt-2 text-3xl font-semibold text-white">{summary.activeToday}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-sm text-slate-400">Verified Matches</p>
            <p className="mt-2 text-3xl font-semibold text-white">{summary.verifiedMatches}%</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-sm text-slate-400">Alerts</p>
            <p className="mt-2 text-3xl font-semibold text-white">{summary.alerts}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Student Records</h2>
            <span className="text-sm text-cyan-400">Live from backend</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Class</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Access</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-slate-800/70">
                    <td className="py-3 pr-4">{student.name}</td>
                    <td className="py-3 pr-4">{student.class}</td>
                    <td className="py-3 pr-4">{student.status}</td>
                    <td className="py-3 pr-4">{student.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {componentEntries.slice(0, 20).map(([key, Component]) => (
            <Component key={key} />
          ))}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
'''))

# Backend files
backend_dir = root / 'backend'
(backend_dir / 'data').mkdir(parents=True, exist_ok=True)
(backend_dir / 'package.json').write_text(json.dumps({
    "name": "portfolio-backend",
    "version": "1.0.0",
    "main": "server.js",
    "scripts": {
        "start": "node server.js"
    }
}, indent=2) + "\n")
(backend_dir / 'server.js').write_text(textwrap.dedent('''\
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 5000;
const dataPath = path.join(__dirname, "data", "students.json");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === "/api/dashboard") {
    const students = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const payload = {
      summary: {
        totalStudents: students.length,
        activeToday: 119,
        verifiedMatches: 93,
        alerts: 4,
      },
      students,
    };
    res.writeHead(200);
    res.end(JSON.stringify(payload));
    return;
  }

  if (req.url === "/api/students") {
    const students = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    res.writeHead(200);
    res.end(JSON.stringify(students));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Not found" }));
});

server.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
'''))
(backend_dir / 'data' / 'students.json').write_text(json.dumps([
    {"id": 1, "name": "Aarav Sharma", "class": "10-A", "status": "Verified", "access": "Granted"},
    {"id": 2, "name": "Diya Patel", "class": "10-B", "status": "Pending", "access": "Review"},
    {"id": 3, "name": "Rohan Verma", "class": "11-A", "status": "Verified", "access": "Granted"},
    {"id": 4, "name": "Sara Khan", "class": "11-C", "status": "Verified", "access": "Granted"},
], indent=2) + "\n")
