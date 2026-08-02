import DashboardShell from "../DashboardShell";

const StudentEditPage = () => (
  <DashboardShell title="Edit Student">
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-6">
      <h2 className="text-2xl font-semibold text-white">Edit Student</h2>
      <p className="text-sm text-slate-400">Edit student details and update their profile.</p>
    </div>
  </DashboardShell>
);

export default StudentEditPage;
