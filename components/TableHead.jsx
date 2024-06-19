import React from 'react'
import { FaFilter, FaSort } from 'react-icons/fa'

const TableHead = ({headerGroups,handleOpenFilter,openFilter}) => {
  return (
    <thead className="">
    {headerGroups.map((headerGroup, index) => (
      <tr {...headerGroup.getHeaderGroupProps()} key={`header-${index}`} >
        {headerGroup.headers.map((column) => (
          <th
            className="px-6 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap tracking-wider relative"
            key={column.id}
          >
            <div className="flex items-center">
              {column.render('Header')}
              {['taskType', 'status', 'date', 'entityName', 'contactPerson', 'note', 'time'].includes(column.id) && (
                <button className="ml-2" onClick={() => handleOpenFilter(column.id)}>
                  <FaFilter className="text-xs" />
                </button>
              )}
              <button className="ml-2" {...column.getSortByToggleProps()}>
                <FaSort className="text-sm" />
              </button>
            </div>
            {openFilter === column.id && (
              <div className="absolute shadow-slate-400 z-20 shadow-lg bg-white border border-gray-200 px-3 py-4 mt-2">
                <h1 className="uppercase p-2 border-b mb-1">{column.id === 'taskType' ? 'Task Type' : column.id.charAt(0).toUpperCase() + column.id.slice(1)}</h1>
                {column.render('Filter')}
              </div>
            )}
          </th>
        ))}
      </tr>
    ))}
  </thead>
  )
}

export default TableHead
