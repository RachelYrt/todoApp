'use client'
import { AiOutlinePlusCircle } from 'react-icons/ai'
// import Modal from './Modal'
// import { FormEventHandler, useState } from 'react'
// import { addTodo } from '@/app/api'
import { useRouter } from 'next/navigation'
// import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'

const AddTask = () => {
  const router = useRouter()
  // const [modalOpen, setModalOpen] = useState<boolean>(false)
  // const [newTaskValue, setNewTaskValue] = useState<string>('')
  // //该函数在表单onsubmit时被调用
  // const handleSumbitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
  //   e.preventDefault() //阻止表单默认行为（阻止刷新页面)
  //   // addTodo 读取当前状态newTaskValue,传给API
  //   await addTodo({
  //     id: uuidv4(),
  //     text: newTaskValue,
  // })
  //清空输入框
  // setNewTaskValue('')
  // setModalOpen(false)
  // router.refresh()

  return (
    <div>
      <Button
        onClick={() => router.push('/add-task')}
        className="btn btn-primary w-full bg-pink-100 border-blue-100 text-black
        hover:bg-blue-200 
        transition-all duration-300"
      >
        Add New Task
        <AiOutlinePlusCircle className="ml-2" size={30} />
      </Button>
      {/* <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <div className="modal-action">
            <input
              // input内为受控组件，输入框由react状态值来显示
              value={newTaskValue}
              //onchange 在每次用户输入/删除时触发，并把事件对象e传进来
              onChange={(e) => setNewTaskValue(e.target.value)} //获取当前输入框文本值 存入到react状态中
              type="text"
              placeholder="Type here"
              className="input input-border w-full"
            />
            <button type="submit" className="btn">
              Add
            </button>
          </div>
        </form>
      </Modal> */}
    </div>
  )
}

export default AddTask
