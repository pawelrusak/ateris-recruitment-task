import { Navigate, Outlet, useLocation } from "react-router";
import { ACCESS_TOKEN } from "../services/api.config";

const PublicRoute = () => {
  const location = useLocation();
  const isAuthorized = localStorage.getItem(ACCESS_TOKEN);

  if (isAuthorized) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
