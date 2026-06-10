"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TaskManager_tasks, _TaskManager_nextId;
Object.defineProperty(exports, "__esModule", { value: true });
class TaskManager {
    constructor(initialTasks = []) {
        _TaskManager_tasks.set(this, void 0);
        _TaskManager_nextId.set(this, void 0);
        __classPrivateFieldSet(this, _TaskManager_tasks, [...initialTasks], "f");
        __classPrivateFieldSet(this, _TaskManager_nextId, initialTasks.length > 0
            ? Math.max(...initialTasks.map((t) => t.id)) + 1
            : 1, "f");
    }
    addTask(dto) {
        var _a, _b;
        const task = {
            ...dto,
            id: (__classPrivateFieldSet(this, _TaskManager_nextId, (_b = __classPrivateFieldGet(this, _TaskManager_nextId, "f"), _a = _b++, _b), "f"), _a),
            createdAt: new Date(),
        };
        __classPrivateFieldGet(this, _TaskManager_tasks, "f").push(task);
        return task;
    }
    updateTask(id, updates) {
        const index = __classPrivateFieldGet(this, _TaskManager_tasks, "f").findIndex((t) => t.id === id);
        if (index === -1)
            return null;
        const updated = {
            ...__classPrivateFieldGet(this, _TaskManager_tasks, "f")[index],
            ...updates,
        };
        __classPrivateFieldGet(this, _TaskManager_tasks, "f")[index] = updated;
        return updated;
    }
    deleteTask(id) {
        const lengthBefore = __classPrivateFieldGet(this, _TaskManager_tasks, "f").length;
        __classPrivateFieldSet(this, _TaskManager_tasks, __classPrivateFieldGet(this, _TaskManager_tasks, "f").filter((t) => t.id !== id), "f");
        return __classPrivateFieldGet(this, _TaskManager_tasks, "f").length < lengthBefore;
    }
    get tasks() {
        return [...__classPrivateFieldGet(this, _TaskManager_tasks, "f")];
    }
    get count() {
        return __classPrivateFieldGet(this, _TaskManager_tasks, "f").length;
    }
    getById(id) {
        return __classPrivateFieldGet(this, _TaskManager_tasks, "f").find((t) => t.id === id);
    }
}
_TaskManager_tasks = new WeakMap(), _TaskManager_nextId = new WeakMap();
class FilteredTaskManager extends TaskManager {
    getByStatus(status) {
        return this.tasks.filter((t) => t.status === status);
    }
    getByPriority(priority) {
        return this.tasks.filter((t) => t.priority === priority);
    }
    getByAssignee(assignee) {
        return this.tasks.filter((t) => t.assignee === assignee);
    }
    getOverdue() {
        const now = new Date();
        return this.tasks.filter((t) => t.dueDate !== null &&
            t.dueDate < now &&
            t.status !== "done" &&
            t.status !== "cancelled");
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
//# sourceMappingURL=task-3.js.map