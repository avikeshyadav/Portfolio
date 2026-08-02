import DashboardShell from "../DashboardShell";

const StudentSearchPage = () => (
  <DashboardShell title="Student Search">
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-6">
      <h2 className="text-2xl font-semibold text-white">Search Students</h2>
      <p className="text-sm text-slate-400">Search students by name, class, ID, or status quickly.</p>
    </div>
  </DashboardShell>
);

export default StudentSearchPage;
