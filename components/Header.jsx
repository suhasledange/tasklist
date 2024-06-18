import React from 'react'
import { MdOutlineMessage } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { links } from '@/constant';
const Header = () => {

  return (

     <header className="bg-[#004b6e] text-white flex sticky top-0 items-center w-full justify-center py-3">
    <nav className='flex items-center justify-between px-5 md:px-10 w-full h-full gap-5 md:gap-20'>

      
      <div className="flex items-center space-x-2">
        {/* <img src="" alt="Private Circle Logo" className="h-8" /> */}
        <span className="text-xl font-semibold">Private Circle</span>
      </div>

    <div className='flex-1 lg:block hidden items-start flex-col md:space-y-4 space-y-2'>
      
      <div className="flex">
      
        <select className="bg-gray-300 outline-none text-[#0f2e3c] md:p-2 py-2 px-1 rounded-s-md h-full">
          <option value="companies">Companies</option>
        </select>
        
        <input
          type="text"
          placeholder=""
          className=" left-40  bg-white text-[#004b6e] outline-none p-2 h-[2.278rem] rounded-e-md w-full "
        />
      
      </div>



      <div className="flex gap-7 md:gap-5 uppercase flex-wrap">
            {
                links.map(item =>(
                    <a className={`${item.submenu ? " font-semibold":" font-thin"} tracking-wide text-sm flex items-center justify-center gap-1`} key={item.id} href="#">{item.title} {item.submenu ?  <IoIosArrowDown className='text-sm'/> : ""} </a>
                ))
            }
      </div>
      </div>


      <div className="flex flex-col items-end gap-4">

            <div className='flex items-center gap-3'>
                    <div>
                        <h1 className='text-sm'>FirstName LastName</h1>
                        <p className='text-xs'>Company Name</p>
                    </div>
                    <div className=' cursor-pointer rounded-full bg-white w-10 h-10'>

                    </div>
            </div>

            <div className='px-2 flex text-xl items-center justify-center gap-5'>
            
            <div className='relative cursor-pointer'>
                 <MdOutlineMessage/>
                <div className='absolute -top-2 -right-2 w-4 h-4 flex items-center text-xs justify-center bg-red-500 rounded-full'>4</div>
            </div>
            
            <div className='relative cursor-pointer'>
                 <LuCalendarDays />
            </div>
            
            <div className='relative cursor-pointer'>

            <FaRegBell className='cursor-pointer'/>
            <div className='absolute -top-2 -right-2 w-4 h-4 flex items-center text-xs justify-center bg-red-500 rounded-full'>1</div>  
            </div>
            </div>

       
      </div>
    </nav>
    </header>

  )
}

export default Header
