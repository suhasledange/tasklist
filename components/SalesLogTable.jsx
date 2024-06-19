'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { FaFilter, FaSort } from 'react-icons/fa';
import { MdCall, MdVideocam } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { format } from 'date-fns';
import { TbCirclePlus } from 'react-icons/tb';

const SalesLogTable = ({ data, handleEditTask }) => {
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedTaskTypes, setSelectedTaskTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSelectedTaskTypes = (taskType) => {
    if (selectedTaskTypes.includes(taskType)) {
      setSelectedTaskTypes(selectedTaskTypes.filter((type) => type !== taskType));
    } else {
      setSelectedTaskTypes([...selectedTaskTypes, taskType]);
    }
  };

  const handleSelectedStatuses = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((type) => type !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const handleSelectedRow = (row) => {
    if (selectedRow && selectedRow.id === row.id) {
      setSelectedRow(null);
    } else {
      setSelectedRow(row);
    }
  };

  const taskTypesData = [
    { id: 1, title: 'Call', icon: <MdCall className="text-gray-800" /> },
    { id: 2, title: 'Meeting', icon: <FaLocationDot className="text-gray-800" /> },
    { id: 3, title: 'Video Call', icon: <MdVideocam className="text-gray-800" /> },
  ];

  const statusData = [
    { id: 1, title: 'Open' },
    { id: 2, title: 'Closed' },
  ];

  const timeOptions = [
    { id: 1, title: 'Morning', value: 'morning' },
    { id: 2, title: 'Afternoon', value: 'afternoon' },
    { id: 3, title: 'Evening', value: 'evening' },
  ];

  const handleStatusOption = (option, row) => {
    switch (option) {
      case 'edit':
        handleEditTask(row.original);
        break;
      case 'duplicate':
        console.log('Duplicate clicked for row:', row);
        break;
      case 'close':
        console.log('Close clicked for row:', row);
        break;
      default:
        break;
    }
    setSelectedRow(null);
  };



  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy'),
        Filter: ({ column }) => (
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
        ),
        filter: (rows, columnIds, filterValue) => {
          const from = new Date(filterValue.from);
          const to = new Date(filterValue.to);
          return rows.filter((row) => {
            const date = new Date(row.values.date);
            return date >= from && date <= to;
          });
        },
      },
      {
        Header: 'Entity Name',
        accessor: 'entityName',
        Cell: ({ value }) => <span className="text-blue font-semibold">{value}</span>,
        Filter: ({ column }) => (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Entity Name"
            className="p-2 border mt-2"
          />
        ),
        filter: (rows, columnIds, filterValue) => {
          return rows.filter((row) => row.values.entityName.toLowerCase().includes(filterValue.toLowerCase()));
        },
      },
      {
        Header: 'Task Type',
        accessor: 'taskType',
        Cell: ({ value }) => {
          let icon;
          switch (value) {
            case 'Call':
              icon = <MdCall className="text-gray-800" />;
              break;
            case 'Meeting':
              icon = <FaLocationDot className="text-gray-800" />;
              break;
            case 'Video Call':
              icon = <MdVideocam className="text-gray-800" />;
              break;
            default:
              icon = null;
              break;
          }
          return (
            <div className="flex items-center">
              {icon}
              <span className="ml-3">{value}</span>
            </div>
          );
        },
        Filter: ({ column }) => (
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
        ),
        filter: (rows, columnIds, filterValue) => {
          if (!filterValue || filterValue.length === 0) return rows;
          return rows.filter((row) => filterValue.includes(row.values.taskType));
        },
      },
      { Header: 'Time', accessor: 'time',
        Filter: ({ column }) => (
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
        ),
        filter: (rows, columnIds, filterValue) => {
          if (!filterValue) return rows;
          return rows.filter((row) => {
            const hour = new Date(`1970-01-01T${row.values.time}`).getHours();
            switch (filterValue) {
              case 'morning':
                return hour >= 5 && hour < 12;
              case 'afternoon':
                return hour >= 12 && hour < 17;
              case 'evening':
                return hour >= 17 && hour < 21;
              default:
                return true;
            }
          });
        },
      },
      {
        Header: 'Contact Person',
        accessor: 'contactPerson',
        Filter: ({ column }) => (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Contact Person"
            className="p-2 border mt-2"
          />
        ),
        filter: (rows, columnIds, filterValue) => {
          return rows.filter((row) => row.values.contactPerson.toLowerCase().includes(filterValue.toLowerCase()));
        },
      },
      {
        Header: 'Notes',
        accessor: 'note',
        Cell : ({row}) => (
          <>
            {
              row.values.note === "" ? (
                <button className='active:scale-95 bg-gray-100 rounded-sm py-2 px-4 gap-2 flex items-center justify-center text-md'>
                <TbCirclePlus className='text-xl text-blue' />
                Add Note
            </button>
              ) : (
                  <span>{row.values.note}</span>
                )
              
            }
          </>              
        ),
        Filter: ({ column }) => (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Notes"
            className="p-2 border mt-2"
          />
        ),
        filter: (rows, columnIds, filterValue) => {
          return rows.filter((row) => row.values.note.toLowerCase().includes(filterValue.toLowerCase()));
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => (
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
        ),
        Filter: ({ column }) => (
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
        ),
        filter: (rows, columnIds, filterValue) => {
          if (!filterValue || filterValue.length === 0) return rows;
          return rows.filter((row) => filterValue.includes(row.values.status));
        },
      },
    ],
    [selectedTaskTypes, selectedStatuses, selectedRow, dateRange, searchTerm, selectedTime]
  );

  const { getTableProps, headerGroups, rows, prepareRow, setFilter } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );

  const handleOpenFilter = (columnId) => {
    if (openFilter === columnId) {
      setOpenFilter(null);
    } else {
      setOpenFilter(columnId);
    }
  };

  useEffect(() => {
    if (selectedTaskTypes.length > 0) {
      setFilter('taskType', selectedTaskTypes);
    } else {
      setFilter('taskType', undefined);
    }
  }, [selectedTaskTypes, setFilter]);

  useEffect(() => {
    if (selectedStatuses.length > 0) {
      setFilter('status', selectedStatuses);
    } else {
      setFilter('status', undefined);
    }
  }, [selectedStatuses, setFilter]);

  useEffect(() => {
    if (dateRange.from || dateRange.to) {
      setFilter('date', dateRange);
    } else {
      setFilter('date', undefined);
    }
  }, [dateRange, setFilter]);

  useEffect(() => {
    if (searchTerm) {
      setFilter('entityName', searchTerm);
      setFilter('contactPerson', searchTerm);
      setFilter('note', searchTerm);
    } else {
      setFilter('entityName', undefined);
      setFilter('contactPerson', undefined);
      setFilter('note', undefined);
    }
  }, [searchTerm, setFilter]);

  useEffect(() => {
    if (selectedTime) {
      setFilter('time', selectedTime);
    } else {
      setFilter('time', undefined);
    }
  }, [selectedTime, setFilter]);

  return (
    <div className="overflow-x-auto min-h-72">
      <table className="min-w-full" {...getTableProps()}>
        <thead className="">
          {headerGroups.map((headerGroup, index) => (
            <tr key={`header-${index}`} {...headerGroup.getHeaderGroupProps()}>
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
        <tbody onClick={() => setOpenFilter(null)} className="bg-white">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr key={`row-${row.id}`} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className="px-6 py-4 whitespace-nowrap" key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalesLogTable;
