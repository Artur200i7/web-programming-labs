import type { Todo, CreateTodoDto, UpdateTodoDto } from "../types/todo"

const BASE_URL = "http://localhost:3001"

export const todosApi = {
  async getAll(): Promise<Todo[]> {
    const res = await fetch(`${BASE_URL}/todos`)
    if (!res.ok) throw new Error("Failed to fetch todos")
    return res.json()
  },

  async create(dto: CreateTodoDto): Promise<Todo> {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Failed to create todo")
    return res.json()
  },

  async update(id: number, dto: UpdateTodoDto): Promise<Todo> {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Failed to update todo")
    return res.json()
  },

  async remove(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete todo")
  },
}
