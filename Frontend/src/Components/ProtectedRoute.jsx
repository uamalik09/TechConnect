import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Wait for authentication check

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;

