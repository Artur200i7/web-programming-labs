import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function PublicRoute({ children }) {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);

  if (token && user) return <Navigate to="/profile" replace />;

  return children;
}

export default PublicRoute;
