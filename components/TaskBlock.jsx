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

  const handleAddTask = ()=>{
    setInitialTask(null);
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
        <div className='flex md:flex-row flex-col items-center md:gap-0 gap-5 justify-between md:px-5 md:py-5 py-4 bg-gray-200/[0.5]'>
            <div className='flex md:gap-8 gap-12 md:ml-5 justify-between md:justify-center items-center'>
                <h1 className='font-bold text-sm md:text-md tracking-wider uppercase'>Sales Log</h1>
                <button onClick={handleAddTask} className='active:scale-95 border-2 md:text-md text-sm border-black/[0.5] rounded-sm py-2 px-4 md:px-6 gap-0 md:gap-3 flex items-center justify-center'>
                    <TbCirclePlus className='text-xl text-blue' />
                    New Task
                </button>
            </div>
            <div className='flex-end mr-2 w-[80%] md:w-[40%]'>
                <input type='text' placeholder='search' className='p-2 outline-none rounded-md w-full'/>
            </div>
        </div>
        <div className='bg-white p-5'>
        
        {
          data?.length ? (
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
