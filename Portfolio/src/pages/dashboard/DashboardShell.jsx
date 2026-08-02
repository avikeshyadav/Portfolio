import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";

const DashboardShell = ({ title, children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "auth_user=; path=/; max-age=0";
    navigate("/login");
  };

  return (
    <DashboardLayout title={title} onLogout={handleLogout}>
      {children}
    </DashboardLayout>
  );
};

export default DashboardShell;
