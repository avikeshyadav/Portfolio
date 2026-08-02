import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const DashboardPage = lazy(() => import("./DashboardPage"));
const StudentsPage = lazy(() => import("./StudentsPage"));
const StudentViewPage = lazy(() => import("./students/StudentViewPage"));
const StudentEditPage = lazy(() => import("./students/StudentEditPage"));
const StudentSearchPage = lazy(() => import("./students/StudentSearchPage"));
const StudentMorePage = lazy(() => import("./students/StudentMorePage"));
const ResumePage = lazy(() => import("./ResumePage"));
const SettingsPage = lazy(() => import("./SettingsPage"));

const DashboardRoutes = () => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading dashboard...
      </div>
    }
  >
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="students" element={<StudentsPage />} />
      <Route path="students/view" element={<StudentViewPage />} />
      <Route path="students/edit" element={<StudentEditPage />} />
      <Route path="students/search" element={<StudentSearchPage />} />
      <Route path="students/more" element={<StudentMorePage />} />
      <Route path="resume" element={<ResumePage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </Suspense>
);

export default DashboardRoutes;
