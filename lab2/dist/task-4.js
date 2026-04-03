"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseNotifier {
    constructor(name) {
        this.name = name;
    }
    notify(to, subject, body) {
        console.log(`[${this.name}] Надсилання сповіщення...`);
        this.send(to, subject, body);
        console.log(`[${this.name}] Сповіщення надіслано`);
    }
}
class EmailNotifier extends BaseNotifier {
    constructor(smtpServer) {
        super("Email");
        this.smtpServer = smtpServer;
    }
    send(to, subject, body) {
        const shortBody = body.slice(0, 50);
        console.log(`Email → ${to}: "${subject}" | Тіло: ${shortBody} через ${this.smtpServer}`);
    }
}
class SmsNotifier extends BaseNotifier {
    constructor(phonePrefix = "+380") {
        super("SMS");
        this.phonePrefix = phonePrefix;
    }
    send(to, subject, body) {
        const shortBody = body.slice(0, 160);
        console.log(`SMS → ${this.phonePrefix}${to}: "${shortBody}"`);
    }
}
function sendBulkNotification(notifiers, to, subject, body) {
    for (const notifier of notifiers) {
        notifier.notify(to, subject, body);
    }
}
// Демонстрація
console.log("Завдання 4: Наслідування та поліморфізм");
const notifiers = [
    new EmailNotifier("smtp.gmail.com"),
    new SmsNotifier(),
];
sendBulkNotification(notifiers, "user@example.com", "Нова задача призначена", "Вам призначено задачу 'Розробити API' з пріоритетом high. Дедлайн: 01.02.2025");
//# sourceMappingURL=task-4.js.map