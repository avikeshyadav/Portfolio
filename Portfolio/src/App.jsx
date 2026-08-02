import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Main_layout = lazy(() => import("./components/Main_layout"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardRoutes = lazy(() => import("./pages/dashboard/DashboardRoutes"));

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getCookie("auth_user")));

  useEffect(() => {
    setIsLoggedIn(Boolean(getCookie("auth_user")));
  }, []);

  const handleLogin = (value = true) => {
    setIsLoggedIn(value);
  };

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={<Main_layout isLoggedIn={isLoggedIn} onLogin={handleLogin} />}
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;