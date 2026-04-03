"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const tasks = [
    {
        id: 1 + config_1.VARIANT,
        title: "Розробити API",
        description: "Реалізувати REST API для управління задачами",
        status: "in_progress",
        priority: "high",
        assignee: "Іван Петренко",
        createdAt: new Date("2025-01-10"),
        dueDate: new Date("2025-02-01"),
    },
    {
        id: 2 + config_1.VARIANT,
        title: "Написати тести",
        description: "Покрити unit-тестами основну логіку",
        status: "todo",
        priority: "medium",
        assignee: null,
        createdAt: new Date("2025-01-12"),
        dueDate: new Date("2025-02-15"),
    },
    {
        id: 3 + config_1.VARIANT,
        title: "Налаштувати БД",
        description: "Підключити PostgreSQL, виконати міграції",
        status: "done",
        priority: "critical",
        assignee: "Олена Коваль",
        createdAt: new Date("2025-01-05"),
        dueDate: new Date("2025-01-20"),
    },
    {
        id: 4 + config_1.VARIANT,
        title: "Оновити документацію",
        description: "Описати API у Swagger",
        status: "todo",
        priority: "low",
        assignee: null,
        createdAt: new Date("2025-01-15"),
        dueDate: null,
    },
    {
        id: 5 + config_1.VARIANT,
        title: "Code review",
        description: "Перевірити pull request від команди",
        status: "cancelled",
        priority: "medium",
        assignee: "Андрій Лисенко",
        createdAt: new Date("2025-01-18"),
        dueDate: new Date("2025-01-25"),
    },
];
function createSuccessResponse(data) {
    return {
        data,
        status: 200,
        message: "OK",
        timestamp: new Date(),
    };
}
function createErrorResponse(message) {
    return {
        data: null,
        status: 500,
        message,
        timestamp: new Date(),
    };
}
function filterTasks(tasks, key, value) {
    return tasks.filter((t) => t[key] === value);
}
// Демонстрація
console.log("Завдання 2: Generics та Utility Types");
console.log("Варіант:", config_1.VARIANT);
console.log("Успішна відповідь:", createSuccessResponse(tasks));
console.log("Помилкова відповідь:", createErrorResponse("Щось пішло не так"));
console.log("Фільтр за статусом 'todo':", filterTasks(tasks, "status", "todo"));
console.log("Фільтр за пріоритетом 'high':", filterTasks(tasks, "priority", "high"));
//# sourceMappingURL=task-2.js.map