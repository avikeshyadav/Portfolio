import DashboardShell from "../DashboardShell";

const StudentViewPage = () => (
  <DashboardShell title="Student View">
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-6">
      <h2 className="text-2xl font-semibold text-white">Student Overview</h2>
      <p className="text-sm text-slate-400">Here you can view the overall student information and selected records.</p>
    </div>
  </DashboardShell>
);

export default StudentViewPage;
