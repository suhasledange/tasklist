'use client'
import React, { useState } from 'react'
import { TbCirclePlus } from "react-icons/tb";
import SalesLogTable from './SalesLogTable';
import NewTaskForm from './NewTaskForm';
const TaskBlock = () => {

    const [formModal,setFormModal] = useState(false);

    const data = [
        {
          date: '12/03/2019',
          entity: 'PQR Private Limited',
          taskType: 'Meeting',
          time: '1:00 PM',
          contact: 'Sansa Stark',
          notes: 'Lorem ipsum dolor sit amet...',
          status: 'Open'
        },
        {
          date: '12/03/2019',
          entity: 'STU Private Limited',
          taskType: 'Video Call',
          time: '1:00 PM',
          contact: 'Frodo Baggins',
          notes: 'Lorem ipsum dolor sit amet...',
          status: 'Open'
        },
        {
            date: '14/03/2019',
            entity: 'ABC Private Limited',
            taskType: 'Meeting',
            time: '1:00 PM',
            contact: 'Frodo Baggins',
            notes: 'Lorem ipsum dolor sit amet...',
            status: 'Open'
          },
          {
            date: '15/03/2019',
            entity: 'ABC Private Limited',
            taskType: 'Call',
            time: '1:00 PM',
            contact: 'Frodo Baggins',
            notes: 'Lorem ipsum dolor sit amet...',
            status: 'Closed'
          },
      ];


  return (
    <>
    <NewTaskForm formModal={formModal} setFormModal={setFormModal}/>
    <div className='flex flex-col max-w-7xl w-full mx-auto shadow-slate-400 shadow-md my-8 h-full'>
        <div className='flex items-center justify-between p-5 bg-gray-200/[0.5]'>
            <div className='flex md:gap-8 gap-4 ml-5 justify-center items-center'>
                <h1 className='font-bold text-md tracking-wider uppercase'>Sales Log</h1>
                <button onClick={()=>setFormModal(prev => !prev)} className='active:scale-95 border-2 border-black/[0.5] rounded-sm py-1 px-6 gap-3 flex items-center justify-center'>
                    <TbCirclePlus className='text-xl' />
                    New Task
                </button>
            </div>
            <div className='flex-end w-[40%]'>
                <input type='text' placeholder='seatch' className='p-2 outline-none rounded-md w-full'/>
            </div>
        </div>
        <div className='bg-white p-5'>
            <SalesLogTable data={data}/>
        </div>
    </div>
    </>

  )
}

export default TaskBlock
