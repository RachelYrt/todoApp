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
  //partial<ITask> 效果是不需要每次传完整的ITask，只传要改的字段即可
  updateTask: (id: string, patch: Partial<ITask>) => Promise<void> //partial<ITask补丁类型，适合Patch/Put
}
type SeedFile = { tasks: ITask[] }
const seedFile = seed as unknown as SeedFile
const seedTask: ITask[] = Array.isArray(seedFile.tasks) ? seedFile.tasks : []
//创建store 指定类型state,actions,后第一个()为调用create 第二个()为传入store配置
export const useTodoStore = create<State & Actions>()(
  devtools(
    persist(
      //persist 将tasks持久化到localstorage
      (set, get) => ({
        //小括号包对象({})表示直接返回对象，
        tasks: [],
        loading: false,

        async fetchTask() {
          if (get().tasks.length) return //如果有数据就不再灌入，防止初始化覆盖用户改动
          //首次调用fetchTask 把seed写入后，persist把state存入localstorage，之后再刷新会先从localstorage复原，
          set({ loading: true, error: undefined })
          try {
            const normalized: ITask[] = seedTask.map((t) => ({
              //t=>{}为函数体块 需要return；t=>()为返回括号内对象

              id: String(t.id),
              text: t.text,
              description: t.description,
            }))
            set({
              //将task更新为normalized
              tasks: normalized,
              loading: false,
            })
          } catch (e: unknown) {
            const message = e instanceof Error ? e.message : 'load data failed'
            set({ loading: false, error: message })
          }
        },
        async createTask(text, description = '') {
          //只改本地store(persist 会写localstorage)
          const id = uuidv4()
          const newTask: ITask = { id, text, description: description.trim() }
          set({ tasks: [newTask, ...get().tasks] })
          //persist 中间件把tasks写到localstorage，以及...get()为平铺旧数组，新数组+旧数组形成新数组
        },
        async updateTask(id, patch) {
          set({
            tasks: get().tasks.map(
              (t) => (t.id === id ? { ...t, ...patch } : t) //patch覆盖t的同名字段
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
