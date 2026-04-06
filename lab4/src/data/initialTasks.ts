import type { Task } from "../types/task";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Вивчити React Router",
    description: "Розібратися з базовими концепціями",
    status: "todo",
    priority: "medium",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Зробити лабораторну №4",
    description: "Завершити всі етапи",
    status: "in-progress",
    priority: "high",
    createdAt: new Date(),
  },
];
