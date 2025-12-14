import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { TodoContext } from "../store/TodoContext";

const ProtectedRoutes = ({ children }) => {
  const { autenticated, checkingAuth } = useContext(TodoContext);
  if (checkingAuth) return null;
  if (autenticated) {
    return <>{children}</>;
  }
  return <Navigate to="/" replace />;
};
export default ProtectedRoutes;
