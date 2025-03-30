import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ element, isAuthenticated, userRoles, allowedRoles }) => {
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Check if the user has at least one of the allowed roles
  const hasAccess = userRoles.some(role => allowedRoles.includes(role));

  return hasAccess ? element : <Navigate to="/studentdashboard" />;
};

export default RoleBasedRoute;
