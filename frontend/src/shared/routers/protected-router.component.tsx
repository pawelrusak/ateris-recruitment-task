import { Navigate, Outlet } from "react-router";
import { ACCESS_TOKEN } from "@/shared/api.config";

const ProtectedRoute = () => {
  const isAuthorized = localStorage.getItem(ACCESS_TOKEN);

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
