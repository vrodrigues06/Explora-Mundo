import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/FakeAuthContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  React.useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
