'use client'
import React, { useMemo, useState, useEffect } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { FaFilter, FaSort } from "react-icons/fa";
import { MdCall, MdVideocam } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { format } from 'date-fns';
const SalesLogTable = ({ data ,handleEditTask}) => {
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedTaskTypes, setSelectedTaskTypes] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleSelectedTaskTypes = (taskType) => {
    if (selectedTaskTypes.includes(taskType)) {
      setSelectedTaskTypes(selectedTaskTypes.filter((type) => type !== taskType));
    } else {
      setSelectedTaskTypes([...selectedTaskTypes, taskType]);
    }
  };

  const handleSelectedRow = (row) => {
    if (selectedRow && selectedRow.id === row.id) {
      setSelectedRow(null);
    } else {
      setSelectedRow(row);
    }
  };

  const handleStatusOption = (option, row) => {
    switch (option) {
      case "edit":
        handleEditTask(row.original);
        break;
      case "duplicate":
        console.log("Duplicate clicked for row:", row);
        break;
      case "close":
        console.log("Close clicked for row:", row);
        break;
      default:
        break;
    }
    setSelectedRow(null);
  };

  const columns = useMemo(
    () => [
      { Header: "Date",
        accessor: "date",
        Cell: ({value}) => format(new Date(value),'dd/MM/yyyy')
      },
      { Header: "Entity Name", accessor: "entityName",

        Cell: ({value}) => (
          <span className="text-[#004b6e] font-semibold">{value}</span>
        )

       },
      {
        Header: "Task Type",
        accessor: "taskType",
        Cell: ({ value }) => {
          let icon;
          switch (value) {
            case "Call":
              icon = <MdCall className="text-gray-800" />;
              break;
            case "Meeting":
              icon = <FaLocationDot className="text-gray-800" />;
              break;
            case "Video Call":
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
            
            <div className="mb-2 flex items-center justify-start">
              <input
                type="checkbox"
                onChange={() => handleSelectedTaskTypes("Call")}
                checked={selectedTaskTypes.includes("Call")}
              />
              <label className="ml-3 flex items-center gap-2 justify-center"><MdCall className="text-gray-800" /> Call</label>
            </div>


            <div className="mb-2 flex items-center justify-start">
              <input
                type="checkbox"
                onChange={() => handleSelectedTaskTypes("Meeting")}
                checked={selectedTaskTypes.includes("Meeting")}
              />
              <label className="ml-3 flex items-center gap-2 justify-center"><FaLocationDot className="text-gray-800" />  Meeting</label>
            </div>
            <div className="mb-3 flex items-center justify-start">
              <input
                type="checkbox"
                onChange={() => handleSelectedTaskTypes("Video Call")}
                checked={selectedTaskTypes.includes("Video Call")}
              />
              <label className="ml-3 flex items-center justify-start gap-2"><MdVideocam className="text-gray-800" /> Video Call</label>
            </div>
          </div>
        ),
      },
      { Header: "Time", accessor: "time" },
      { Header: "Contact Person", accessor: "contactPerson" },
      { Header: "Notes", accessor: "note" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <div className="flex justify-between items-center relative">
            <span className={` font-semibold ${row.values.status === "Open" ? "text-red-500" : "text-blue-500"}`}>
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
                <p className=" border-b p-2 py-3 uppercase">Options</p>
                <ul className="p-2 space-y-2">
                  <li className=" cursor-pointer" onClick={() => handleStatusOption("edit", row)}>Edit</li>
                  <li className=" cursor-pointer" onClick={() => handleStatusOption("duplicate", row)}>Duplicate</li>
                  <li className=" cursor-pointer" onClick={() => handleStatusOption("close", row)}>Change Status to Closed</li>
                </ul>
              </div>
            )}
          </div>
        ),
      },
    ],
    [selectedTaskTypes, selectedRow]
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
    if(openFilter) setOpenFilter(null);
    else setOpenFilter(columnId);
  };

  useEffect(() => {
    if (selectedTaskTypes.length > 0) {
      setFilter("taskType", selectedTaskTypes);
    } else {
      setFilter("taskType", undefined);
    }
  }, [selectedTaskTypes, setFilter]);

  return (
    <div className="overflow-x-auto min-h-72">
      <table className="min-w-full" {...getTableProps()}>
        <thead className="">
          {headerGroups.map((headerGroup,index) => (
            <tr key={`header-${index}`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap tracking-wider relative"
                  key={column.id}
                >
                  <div className="flex items-center">
                    {column.render("Header")}
                    {column.id === "taskType" && (
                      <button className="ml-2" onClick={() => handleOpenFilter(column.id)}>
                        <FaFilter className="text-xs" />
                      </button>
                    )}
                    <button className="ml-2" {...column.getSortByToggleProps()}>
                      <FaSort className="text-sm" />
                    </button>
                  </div>
                  {openFilter === column.id && (
                    <div className="absolute shadow-slate-400 shadow-lg bg-white border border-gray-200 p-2 mt-2">
                     <h1 className=" uppercase p-2 border-b mb-1">Task type</h1>
                      {column.render("Filter")}                      
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="bg-white divide-gray-200">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr key={`row-${row.id}`} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className="px-6 py-4 whitespace-nowrap" key={cell.column.id}>
                    {cell.render("Cell")}
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
