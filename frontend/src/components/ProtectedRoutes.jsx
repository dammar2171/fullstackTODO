import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, autenticated, checkingAuth }) => {
  if (checkingAuth) return null;
  if (autenticated) {
    return <>{children}</>;
  }
  return <Navigate to="/" replace />;
};
export default ProtectedRoutes;
