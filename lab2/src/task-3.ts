export {};

type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null;
  createdAt: Date;
  dueDate: Date | null;
}

class TaskManager {
  #tasks: Task[];
  #nextId: number;

  constructor(initialTasks: Task[] = []) {
    this.#tasks = [...initialTasks];
    this.#nextId = initialTasks.length > 0
      ? Math.max(...initialTasks.map((t) => t.id)) + 1
      : 1;
  }

  addTask(dto: Omit<Task, "id" | "createdAt">): Task {
    const task: Task = {
      ...dto,
      id: this.#nextId++,
      createdAt: new Date(),
    };
    this.#tasks.push(task);
    return task;
  }

  updateTask(
    id: number,
    updates: Partial<Omit<Task, "id" | "createdAt">>
  ): Task | null {
    const index = this.#tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const updated: Task = {
      ...this.#tasks[index],
      ...updates,
    };
    this.#tasks[index] = updated;
    return updated;
  }

  deleteTask(id: number): boolean {
    const lengthBefore = this.#tasks.length;
    this.#tasks = this.#tasks.filter((t) => t.id !== id);
    return this.#tasks.length < lengthBefore;
  }

  get tasks(): Task[] {
    return [...this.#tasks];
  }

  get count(): number {
    return this.#tasks.length;
  }

  getById(id: number): Task | undefined {
    return this.#tasks.find((t) => t.id === id);
  }
}

class FilteredTaskManager extends TaskManager {
  getByStatus(status: Status): Task[] {
    return this.tasks.filter((t) => t.status === status);
  }

  getByPriority(priority: Priority): Task[] {
    return this.tasks.filter((t) => t.priority === priority);
  }

  getByAssignee(assignee: string): Task[] {
    return this.tasks.filter((t) => t.assignee === assignee);
  }

  getOverdue(): Task[] {
    const now = new Date();
    return this.tasks.filter(
      (t) =>
        t.dueDate !== null &&
        t.dueDate < now &&
        t.status !== "done" &&
        t.status !== "cancelled"
    );
  }
}

// Демонстрація
console.log("Завдання 3: Класи та модифікатори доступу");

const manager = new FilteredTaskManager();

const task1 = manager.addTask({
  title: "Розробити API",
  description: "REST API для задач",
  status: "in_progress",
  priority: "high",
  assignee: "Іван",
  dueDate: new Date("2025-02-01"),
});

const task2 = manager.addTask({
  title: "Написати тести",
  description: "Unit-тести",
  status: "todo",
  priority: "medium",
  assignee: null,
  dueDate: new Date("2025-02-10"),
});

const task3 = manager.addTask({
  title: "Налаштувати БД",
  description: "PostgreSQL",
  status: "done",
  priority: "critical",
  assignee: "Олена",
  dueDate: new Date("2025-01-20"),
});

const task4 = manager.addTask({
  title: "Оновити документацію",
  description: "Swagger",
  status: "todo",
  priority: "low",
  assignee: "Іван",
  dueDate: null,
});

console.log("Додано:", task1);
console.log("Кількість задач:", manager.count);
console.log("За статусом 'todo':", manager.getByStatus("todo"));
console.log("За пріоритетом 'high':", manager.getByPriority("high"));
console.log("За виконавцем 'Іван':", manager.getByAssignee("Іван"));
console.log("Прострочені:", manager.getOverdue());
