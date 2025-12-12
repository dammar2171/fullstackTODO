import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, autenticated }) => {
  if (autenticated) {
    return <>{children}</>;
  }
  return <Navigate to="/" replace />;
};
export default ProtectedRoutes;
