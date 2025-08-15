'use client'
import { useEffect } from 'react'
import TodoList from './TodoList'
import { useTodoStore } from '@/lib/store/todoStore'
import AddTask from './AddTask'

export default function TodoApp() {
  const fetchTask = useTodoStore((s) => s.fetchTask)
  const loading = useTodoStore((s) => s.loading)
  const error = useTodoStore((s) => s.error)
  useEffect(() => {
    fetchTask()
  }, [fetchTask])
  return (
    <main className="flex justify-center">
      <div className="w-full px-4 max-w-4xl flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center">Todo App</h1>
        <AddTask />
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <TodoList />
      </div>
    </main>
  )
}
