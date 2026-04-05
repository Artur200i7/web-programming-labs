import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./TaskForm.module.css";

// ZOD-схема для валідації даних форми задачі
const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Заголовок має містити щонайменше 3 символи")
    .max(100, "Заголовок не може перевищувати 100 символів"),
  description: z.string().max(500, "Опис не може перевищувати 500 символів"),
  priority: z.enum(["low", "medium", "high"], {
    message: "Оберіть пріоритет",
  }),
});

export type TaskFormData = z.infer<typeof taskSchema>;

interface Props {
  onSubmit: (data: TaskFormData) => void;
}

export default function TaskForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset(); // очищаємо форму після успішного сабміту
      })}
    >
      {/* Поле заголовку */}
      <div className={styles.field}>
        <label>Заголовок</label>
        <input type="text" {...register("title")} />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      {/* Поле опису */}
      <div className={styles.field}>
        <label>Опис</label>
        <textarea {...register("description")} />
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </div>

      {/* Поле пріоритету */}
      <div className={styles.field}>
        <label>Пріоритет</label>
        <select {...register("priority")}>
          <option value="">Оберіть пріоритет</option>
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
        {errors.priority && (
          <p className={styles.error}>{errors.priority.message}</p>
        )}
      </div>

      <button type="submit" className={styles.submit}>
        Додати задачу
      </button>
    </form>
  );
}
