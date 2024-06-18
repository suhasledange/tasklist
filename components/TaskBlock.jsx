'use client'
import React, { useContext, useEffect, useState } from 'react'
import { TbCirclePlus } from "react-icons/tb";
import SalesLogTable from './SalesLogTable';
import NewTaskForm from './NewTaskForm';
import { useTaskProvider } from '@/context/TaskProvider';
const TaskBlock = () => {

  const {fetchTasks} = useTaskProvider();
  const [data,setData] = useState([]);
  const [formModal,setFormModal] = useState(false);
  const [initialTask,setInitialTask] = useState(null);


  const fetchData = async()=>{
    try {
      const res = await fetchTasks();
      setData(res)

    } catch (error) {
      console.log("Error fetching tasks",error)
    }

  }

  useEffect(()=>{

    fetchData();

  },[])

  const handleEditTask = (task) =>{
    setInitialTask(task);
    setFormModal(true);
  }

  return (
    <>
    <NewTaskForm setData={setData}
                 formModal={formModal} 
                setFormModal={setFormModal}
                initialTask={initialTask}
                />
    <div className='flex flex-col max-w-7xl w-full mx-auto shadow-slate-400 shadow-md my-8 '>
        <div className='flex items-center justify-between p-5 bg-gray-200/[0.5]'>
            <div className='flex md:gap-8 gap-4 ml-5 justify-center items-center'>
                <h1 className='font-bold text-md tracking-wider uppercase'>Sales Log</h1>
                <button onClick={()=>{setInitialTask(null); setFormModal(true);}} className='active:scale-95 border-2 border-black/[0.5] rounded-sm py-1 px-6 gap-3 flex items-center justify-center'>
                    <TbCirclePlus className='text-xl' />
                    New Task
                </button>
            </div>
            <div className='flex-end w-[40%]'>
                <input type='text' placeholder='seatch' className='p-2 outline-none rounded-md w-full'/>
            </div>
        </div>
        <div className='bg-white p-5'>
        
        {
          data.length ? (
          <SalesLogTable data={data} handleEditTask={handleEditTask}/>
          ):(
            <div className='px-6 py-4'>Loading...</div>
          )
          }
        </div>
    </div>
    </>

  )
}

export default TaskBlock
