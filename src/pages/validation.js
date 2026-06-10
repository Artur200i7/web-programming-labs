import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Некоректний email"),
  password: z.string().min(6, "Мінімальна довжина пароля 6 символів"),
});
