import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "./validation";
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const navigate = useNavigate();
  const [serverError, setServerError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const registerMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/auth/register", data);
      return res.data;
    },
    onSuccess: () => {
      setServerError("");
      setSuccessMessage("Акаунт створено. Тепер увійдіть.");
      setTimeout(() => navigate("/login"), 1000);
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        setServerError("Користувач з таким email вже існує");
      } else if (error.response?.status === 400) {
        setServerError("Невалідні дані");
      } else {
        setServerError("Сталася помилка. Спробуйте ще раз.");
      }
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Реєстрація</h1>
      {serverError && (
        <div style={{ color: "red", marginBottom: "10px" }}>{serverError}</div>
      )}
      {successMessage && (
        <div style={{ color: "green", marginBottom: "10px" }}>
          {successMessage}
        </div>
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
        <button type="submit" disabled={registerMutation.isLoading}>
          {registerMutation.isLoading ? "Реєстрація..." : "Зареєструватися"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
