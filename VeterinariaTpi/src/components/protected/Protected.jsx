import { useAuth } from "../../Services/authContext/AuthContext";
import { isTokenValid } from "./Protected.helpers.js";
import { Navigate, Outlet } from "react-router";

const Protected = ({ requireAdmin = false }) => {
  const { token, user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/unauthorized" />;
  }
  if (requireAdmin && user.idRole < 3) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default Protected;
