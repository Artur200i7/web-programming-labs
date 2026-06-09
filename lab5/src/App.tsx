import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { todosApi } from "./api/todos"
import type { Todo } from "./types/todo"

function App() {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState("")

  const { data, isLoading, isError, error } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => todosApi.getAll(),
  })

  const createMutation = useMutation({
    mutationFn: () => todosApi.create({ title, completed: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
      setTitle("")
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      todosApi.update(id, { completed }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => todosApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  })

  if (isLoading) return <div>Завантаження...</div>
  if (isError) return <div>Помилка: {(error as Error).message}</div>

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo List</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Нове завдання"
      />
      <button onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
        Додати
      </button>

      <hr />

      {data!.map((todo) => (
        <div key={todo.id} style={{ marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) =>
              updateMutation.mutate({ id: todo.id, completed: e.target.checked })
            }
          />

          <span style={{ textDecoration: todo.completed ? "line-through" : "none", marginLeft: 8 }}>
            {todo.title}
          </span>

          <button
            style={{ marginLeft: 12 }}
            onClick={() => deleteMutation.mutate(todo.id)}
          >
            Видалити
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
