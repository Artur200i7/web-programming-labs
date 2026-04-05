import clsx from "clsx";
import type { Task, TaskStatus } from "../../types/task";
import styles from "./TaskCard.module.css";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export default function TaskCard({ task, onDelete, onStatusChange }: Props) {
  const priorityClass = {
    low: styles.cardLow,
    medium: styles.cardMedium,
    high: styles.cardHigh,
  }[task.priority];

  return (
    <div className={clsx(styles.card, priorityClass)}>
      <h3 className={styles.title}>{task.title}</h3>

      {task.description && <p>{task.description}</p>}

      <div className={styles.meta}>
        <span>Пріоритет: {task.priority}</span>
        <span>
          Дата: {task.createdAt.toLocaleDateString("uk-UA")}
        </span>
      </div>

      <div className={styles.actions}>
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
        >
          <option value="todo">Нові</option>
          <option value="in-progress">В роботі</option>
          <option value="done">Виконані</option>
        </select>

        <button onClick={() => onDelete(task.id)}>Видалити</button>
      </div>
    </div>
  );
}
