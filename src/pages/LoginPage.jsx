import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "./validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [serverError, setServerError] = React.useState("");

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      setServerError("");
      // ПІДГОНЯЙ ПІД СВІЙ БЕКЕНД:
      // наприклад: { accessToken, user }
      setToken(data.accessToken || data.token);
      setUser(data.user);
      queryClient.invalidateQueries(["me"]);
      navigate("/profile");
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        setServerError("Невірний email або пароль");
      } else if (error.response?.status === 400) {
        setServerError("Невалідні дані");
      } else {
        setServerError("Сталася помилка. Спробуйте ще раз.");
      }
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Вхід</h1>
      {serverError && (
        <div style={{ color: "red", marginBottom: "10px" }}>{serverError}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Пароль</label>
          <input type="password" {...register("password")} />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? "Вхід..." : "Увійти"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
