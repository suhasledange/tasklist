import React from 'react'
import { MdCall, MdVideocam } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
export const DateFilter = ({ dateRange ,setDateRange}) => {


  return (
    <div className="flex flex-col p-2 gap-2">
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              placeholder="From"
              className="p-2 border"
            />
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              placeholder="To"
              className="p-2 border"
            />
          </div>
  )
}

export const EntiryFilter = ({searchTerm,setSearchTerm})=>{
    return (
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Entity Name"
            className="p-2 border mt-2"
          />
    )
}

export const TaskTypeFilter = ({selectedTaskTypes,handleSelectedTaskTypes})=>{

    const taskTypesData = [
        { id: 1, title: 'Call', icon: <MdCall className="text-gray-800" /> },
        { id: 2, title: 'Meeting', icon: <FaLocationDot className="text-gray-800" /> },
        { id: 3, title: 'Video Call', icon: <MdVideocam className="text-gray-800" /> },
      ];

    return (
        <div className="flex flex-col p-2 gap-2">
        {taskTypesData.map((data) => (
          <div key={data.id} className="mb-2 flex items-center justify-start">
            <input
              type="checkbox"
              onChange={() => handleSelectedTaskTypes(data.title)}
              checked={selectedTaskTypes.includes(data.title)}
            />
            <label className="ml-3 flex items-center gap-2 justify-center">
              {data.icon} {data.title}
            </label>
          </div>
        ))}
      </div>
    )
}


export const TimeFilter = ({selectedTime,setSelectedTime})=>{

    const timeOptions = [
        { id: 1, title: 'Morning', value: 'morning' },
        { id: 2, title: 'Afternoon', value: 'afternoon' },
        { id: 3, title: 'Evening', value: 'evening' },
      ];


    return (
        <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="p-2 border mt-2"
          >
            <option value="">Select Time</option>
            {timeOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
    )
}


export const ContactPersonFilter = ({searchTerm,setSearchTerm})=>{
    return (
        <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Contact Person"
        className="p-2 border mt-2"
      />
    )
}

export const NotesFilter = ({searchTerm,setSearchTerm})=>{
    return (
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Notes"
            className="p-2 border mt-2"
          />
    )
}

export const StatusFilter = ({handleSelectedStatuses,selectedStatuses})=>{

    const statusData = [
        { id: 1, title: 'Open' },
        { id: 2, title: 'Closed' },
      ];
    

    return (
        <div className="flex flex-col p-2 gap-2">
        {statusData.map((status) => (
          <div key={status.id} className="mb-2 flex items-center justify-start">
            <input
              type="checkbox"
              onChange={() => handleSelectedStatuses(status.title)}
              checked={selectedStatuses.includes(status.title)}
            />
            <label className="ml-3 flex items-center gap-2 justify-center">
              {status.title}
            </label>
          </div>
        ))}
      </div>
    )
}


export const StatusRow = ({row,selectedRow,handleSelectedRow,handleStatusOption})=>{

    


    return (

        <div className="flex justify-between items-center relative">
        <span className={`font-semibold ${row.values.status === 'Open' ? 'text-red-500' : 'text-blue-500'}`}>
          {row.values.status}
        </span>
        <button
          className="ml-2 gap-1 border p-1 bg-gray-100 flex items-center justify-center"
          onClick={() => handleSelectedRow(row)}
        >
          Options <IoIosArrowDown className="text-sm" />
        </button>
        {selectedRow?.id === row?.id && (
          <div className="absolute z-10 top-8 shadow-slate-400 shadow-lg bg-white border border-gray-200 p-2 mt-2 right-0">
            <p className="border-b p-2 py-3 uppercase">Options</p>
            <ul className="p-2 space-y-2">

              <li className="cursor-pointer" onClick={() => handleStatusOption('edit', row)}>
                Edit
              </li>

              <li className="cursor-pointer" onClick={() => handleStatusOption('duplicate', row)}>
                Duplicate
              </li>

              <li className="cursor-pointer" onClick={() => handleStatusOption('close', row)}>
                Change Status to { row.values.status === 'Open' ? "Closed" : "Open" }
              </li>

            </ul>
          </div>
        )}
      </div>
   
        )
}