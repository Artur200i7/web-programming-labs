export interface Todo {
  id: number
  title: string
  completed: boolean
}

export type CreateTodoDto = {
  title: string
  completed: boolean
}

export type UpdateTodoDto = Partial<Omit<Todo, "id">>
