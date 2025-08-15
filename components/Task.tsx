'use client'
import { ITask } from '@/types/tasks'
import { MdOutlineEditNote } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
// interface TaskProps {
//   task: ITask
// }
import React from 'react'
import Modal from './Modal'

// import { Input } from './ui/input'
import { TableCell, TableRow } from './ui/table'
import { useForm } from 'react-hook-form'
import { Textarea } from './ui/textarea'
import { useTodoStore } from '@/lib/store/todoStore'

const Task: React.FC<{ task: ITask }> = ({ task }) => {
  // const router = useRouter()
  type EditForm = {
    newTaskText: string
    description: string
  }
  const [openModalEdit, setModalEdit] = useState<boolean>(false)
  const [openModalDelete, setModalDelete] = useState<boolean>(false)
  const updateTask = useTodoStore((s) => s.updateTask)
  const removeTask = useTodoStore((s) => s.removeTask)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<EditForm>({
    defaultValues: {
      newTaskText: task.text,
      description: task.description,
    },
  })
  //提交编辑
  const onEditSumbit = async ({ newTaskText, description }: EditForm) => {
    // await editTodo({ id: task.id, text: newTaskText, description })
    await updateTask(task.id, {
      text: newTaskText,
      description: (description ?? '').trim(),
    })
    setModalEdit(false)
    // router.refresh()
  }
  const onDelete = async () => {
    // await deleteTodo(task.id)
    await removeTask(task.id)
    setModalDelete(false)
    // router.refresh()
  }
  // const [taskToEdit, setTaskToEdit] = useState<string>(task.text)
  // const handleSumbitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
  //   e.preventDefault()
  //   await editTodo({
  //     id: task.id,
  //     text: taskToEdit,
  //   })
  //   // setTaskToEdit('')
  //   setModalEdit(false)
  //   router.refresh()
  // }
  // const handleDeleteTodo = async (id: string) => {
  //   await deleteTodo(id)
  //   setModalDelete(false)
  //   router.refresh()
  // }
  return (
    // <tr key={task.id}>
    //   <td className="w-full">{task.text}</td>
    //   <td className="flex gap-5">
    <TableRow>
      <TableCell className="w-full">
        <div className="font-medium">{task.text}</div>
        <div className="text-gray-400 text-sm">{task.description ?? ''}</div>
      </TableCell>
      <TableCell className="flex gap-5">
        <MdOutlineEditNote
          // onClick={() => setModalEdit(true)}
          onClick={() => {
            reset({
              newTaskText: task.text,
              description: task.description ?? '',
            })
            setModalEdit(true)
          }}
          cursor="pointer"
          className="text-blue-400"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setModalEdit}>
          <form onSubmit={handleSubmit(onEditSumbit)}>
            <p className="font-bold text-lg">Edit task</p>
            <div className="modal-action flex flex-col items-center w-md space-y-4">
              <Textarea
                // value={taskToEdit}
                // onChange={(e) => setTaskToEdit(e.target.value)} //获取当前输入框文本值 存入到react状态中
                // type="text"
                placeholder="Type here"
                {...register('newTaskText', {
                  required: 'Task is required',
                  minLength: { value: 2, message: 'Task is too short.' },
                })}
              />
              <Textarea
                // value={taskToEdit}
                // onChange={(e) => setTaskToEdit(e.target.value)} //获取当前输入框文本值 存入到react状态中
                // type="text"
                placeholder="Type here"
                {...register('description', {
                  required: '',
                })}
                // className="input input-border w-full"
              />
              {errors.newTaskText && (
                <span className="text-sm text-red-500">
                  {errors.newTaskText.message}
                </span>
              )}
              <Button type="submit" className="btn" variant="secondary">
                {isSubmitting ? 'saving' : 'Submit'}
              </Button>
            </div>
          </form>
        </Modal>
        <BiTrash
          onClick={() => setModalDelete(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setModalDelete}>
          <h3 className="text-lg">Delete this task?</h3>
          <div className="modal-action">
            <Button
              onClick={onDelete}
              className="btn bg-red-400"
              variant="destructive"
            >
              Yes
            </Button>
          </div>
        </Modal>
        {/* </td>
    </tr> */}
      </TableCell>
    </TableRow>
  )
}

export default Task
