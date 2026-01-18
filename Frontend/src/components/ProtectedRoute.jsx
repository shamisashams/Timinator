import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authUtils";

/**
 * ProtectedRoute component
 * Redirects to login if user is not authenticated
 * Renders children if user is authenticated
 */
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the protected component
  return children;
};

export default ProtectedRoute;