import { useQuery } from "@tanstack/react-query"
import { todosApi } from "./api/todos"
import type { Todo } from "./types/todo"

function App() {
  const { data, isLoading, isError, error } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => todosApi.getAll(),
  })

  if (isLoading) return <div>Завантаження...</div>

  if (isError) return <div>Помилка: {(error as Error).message}</div>

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo List</h1>

      {data!.map((todo) => (
        <div key={todo.id}>
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.title}
          </span>
        </div>
      ))}
    </div>
  )
}

export default App
