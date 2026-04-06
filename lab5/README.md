Цей застосунок демонструє роботу з TanStack React Query, локальним API на базі JSON Server, мутаціями, кешуванням та інвалідацією даних.

Використані технології
Vite + React + TypeScript

@tanstack/react-query

JSON Server

Fetch API (обраний HTTP‑клієнт)

React Hooks (useState, useQuery, useMutation)

Запуск проєкту
Термінал 1 — запуск JSON Server
bash
npm run server
JSON Server працює на:

Код
http://localhost:3001
Термінал 2 — запуск React застосунку
bash
npm run dev
React працює на:

Код
http://localhost:5173
✔ Функціональність
Перегляд списку todos (GET)

Створення нового todo (POST)

Оновлення completed (PATCH)

Видалення todo (DELETE)

Автоматична інвалідація кешу після мутацій

Живе оновлення списку