import AddTask from '@/components/AddTask'
import { TodoList } from '@/components/TodoList'
import { getallTodos } from './api'

export default async function Home() {
  const tasks = await getallTodos()
  console.log(tasks)
  return (
    <main className="flex justify-center">
      <div className="w-full px-4 max-w-4xl my-5 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center">Todo App</h1>
        <AddTask />
        <TodoList tasks={tasks} />
      </div>
    </main>
  )
}
