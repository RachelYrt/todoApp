'use client'
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type { ITask } from '@/types/tasks'
import { v4 as uuidv4 } from 'uuid'
import seed from '@/data/todos.json'

type State = {
  tasks: ITask[]
  loading: boolean
  error?: string
}
type Actions = {
  fetchTask: () => Promise<void>
  createTask: (text: string, description?: string) => Promise<void>
  removeTask: (id: string) => Promise<void>
  updateTask: (id: string, patch: Partial<ITask>) => Promise<void> //partial<ITask补丁类型，适合Patch/Put
}
type SeedFile = { tasks: ITask[] }
const seedFile = seed as unknown as SeedFile
const seedTask: ITask[] = Array.isArray(seedFile.tasks) ? seedFile.tasks : []
//创建store 指定类型state,actions,后第一个()为调用create 第二个()为传入store配置
export const useTodoStore = create<State & Actions>()(
  devtools(
    persist(
      (set, get) => ({
        tasks: [],
        loading: false,

        async fetchTask() {
          if (get().tasks.length) return
          set({ loading: true, error: undefined })
          try {
            const normalized: ITask[] = seedTask.map((t) => ({
              id: String(t.id),
              text: t.text,
              description: t.description,
            }))
            set({
              tasks: normalized,
              loading: false,
            })
          } catch (e: unknown) {
            const message = e instanceof Error ? e.message : 'load data failed'
            set({ loading: false, error: message })
          }
        },
        async createTask(text, description = '') {
          const id = uuidv4()
          const newTask: ITask = { id, text, description: description.trim() }
          set({ tasks: [newTask, ...get().tasks] })
          //persist 中间件把tasks写到localstorage
        },
        async updateTask(id, patch) {
          set({
            tasks: get().tasks.map((t) =>
              t.id === id ? { ...t, ...patch } : t
            ),
          })
        },
        async removeTask(id) {
          set({ tasks: get().tasks.filter((t) => t.id !== id) })
        },
      }),
      { name: 'todo-store' }
      //将tsore数据持久化；(set,get)=>({...})为store主体定义，set更新状态 get获取状态 {...}返回state初始值+actions方法
      //name:'todo=store 指定存储的key
    )
  )
)
