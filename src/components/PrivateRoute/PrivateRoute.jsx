import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="loader">Loading...</div>;
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;