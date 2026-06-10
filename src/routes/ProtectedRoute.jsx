import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

const fetchMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

function ProtectedRoute({ children }) {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const token = useAuthStore((s) => s.token);

  const { isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: !!token && !user,
    onSuccess: (data) => setUser(data),
    retry: false,
  });

  if (!token) return <Navigate to="/login" replace />;

  if (isLoading) return <div>Завантаження...</div>;

  if (isError && !user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
