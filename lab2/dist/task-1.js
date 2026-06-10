"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTaskStats(tasks) {
    const byStatus = {
        todo: 0,
        in_progress: 0,
        done: 0,
        cancelled: 0,
    };
    let overdue = 0;
    const now = new Date();
    for (const task of tasks) {
        byStatus[task.status]++;
        if (task.dueDate !== null &&
            task.dueDate < now &&
            task.status !== "done" &&
            task.status !== "cancelled") {
            overdue++;
        }
    }
    return {
        total: tasks.length,
        byStatus,
        overdue,
    };
}
function formatTask(task) {
    return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`;
}
// Демонстрація
console.log("=== Завдання 1: Базові типи, інтерфейси та type aliases ===");
const tasks1 = [
    {
        id: 1,
        title: "Налаштувати CI/CD",
        description: "Налаштувати GitHub Actions",
        status: "in_progress",
        priority: "high",
        assignee: "Іван",
        createdAt: new Date("2025-01-01"),
        dueDate: new Date("2025-01-20"),
    },
    {
        id: 2,
        title: "Написати документацію",
        description: "Описати API",
        status: "todo",
        priority: "medium",
        assignee: null,
        createdAt: new Date("2025-01-05"),
        dueDate: new Date("2025-02-01"),
    },
    {
        id: 3,
        title: "Виправити баги",
        description: "Критичні помилки у продакшені",
        status: "done",
        priority: "critical",
        assignee: "Олена",
        createdAt: new Date("2025-01-02"),
        dueDate: new Date("2025-01-10"),
    },
    {
        id: 4,
        title: "Оновити залежності",
        description: "Оновити npm пакети",
        status: "cancelled",
        priority: "low",
        assignee: "Андрій",
        createdAt: new Date("2025-01-03"),
        dueDate: new Date("2025-01-15"),
    },
    {
        id: 5,
        title: "Оптимізувати запити",
        description: "Покращити продуктивність БД",
        status: "todo",
        priority: "high",
        assignee: null,
        createdAt: new Date("2025-01-07"),
        dueDate: new Date("2025-01-25"),
    },
];
console.log("Статистика:", getTaskStats(tasks1));
console.log("Форматовані задачі:");
tasks1.forEach((t) => console.log(formatTask(t)));
//# sourceMappingURL=task-1.js.map