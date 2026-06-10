import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";

const fetchMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

function ProfilePage() {
  const setUser = useAuthStore((s) => s.setUser);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    onSuccess: (data) => setUser(data),
    retry: false,
  });

  if (isLoading) return <div>Завантаження профілю...</div>;

  if (isError) return <div>Не вдалося завантажити профіль.</div>;

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Профіль</h1>
      <p>
        <strong>ID:</strong> {data.id}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Створено:</strong>{" "}
        {data.createdAt ? new Date(data.createdAt).toLocaleString() : "—"}
      </p>
    </div>
  );
}

export default ProfilePage;
