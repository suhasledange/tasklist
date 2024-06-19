"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { MdCall, MdVideocam } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { format } from "date-fns";
import {
  ContactPersonFilter,
  DateFilter,
  EntiryFilter,
  NotesFilter,
  NotesRow,
  StatusFilter,
  StatusRow,
  TaskTypeFilter,
  TimeFilter,
} from "./Filters";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useTaskProvider } from "@/context/TaskProvider";
import { FaFilter } from "react-icons/fa";

const SalesLogTable = ({ data, handleEditTask }) => {

  const [openFilter, setOpenFilter] = useState(null);
  const [selectedTaskTypes, setSelectedTaskTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const { handleDupliAndStatus } = useTaskProvider();

  const handleSelectedTaskTypes = (taskType) => {
    if (selectedTaskTypes.includes(taskType)) {
      setSelectedTaskTypes(
        selectedTaskTypes.filter((type) => type !== taskType)
      );
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

 
  const handleStatusOption = (option, row) => {
    switch (option) {
      case "edit":
        handleEditTask(row.original);
        break;
      case "duplicate":
        handleDupliAndStatus(row.original,"Do you want to duplicate this task ?",false);
        break;
      case "status":
        handleDupliAndStatus(row.original,"Do you want to change the status ?",true);
        break;
      default:
        break;
    }
    setSelectedRow(null);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
        Filter: ({ column }) => (
          <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
        ),
        filter: (rows, columnIds, filterValue) => {
          const from = filterValue.from ? new Date(filterValue.from) : null;
          const to = filterValue.to ? new Date(filterValue.to) : null;
          return rows.filter((row) => {
            const date = new Date(row.original.createdAt);
            if (from && to) return date >= from && date <= to;
            if (from) return date >= from;
            if (to) return date <= to;
            return true;
          });
        },
      },
      {
        Header: "Entity Name",
        accessor: "entityName",
        Cell: ({ value }) => (
          <span className="text-blue whitespace-break-spaces w-[15rem] font-semibold inline-block">{value}</span>
        ),
        Filter: ({ column }) => (
          <EntiryFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        ),
        filter: (rows, columnIds, filterValue) => {
          return rows.filter((row) =>
            row.values.entityName
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          );
        },
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
          <TaskTypeFilter
            selectedTaskTypes={selectedTaskTypes}
            handleSelectedTaskTypes={handleSelectedTaskTypes}
          />
        ),
        filter: (rows, columnIds, filterValue) => {
          if (!filterValue || filterValue.length === 0) return rows;
          return rows.filter((row) =>
            filterValue.includes(row.values.taskType)
          );
        },
      },
      {
        Header: "Time",
        accessor: "time",
        Filter: ({ column }) => (
          <TimeFilter
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        ),
        filter: (rows, columnIds, filterValue) => {
          if (!filterValue) return rows;
          return rows.filter((row) => {
            const hour = new Date(`1970-01-01T${row.values.time}`).getHours();
            switch (filterValue) {
              case "morning":
                return hour >= 5 && hour < 12;
              case "afternoon":
                return hour >= 12 && hour < 17;
              case "evening":
                return hour >= 17 && hour < 21;
              default:
                return true;
            }
          });
        },
      },
      {
        Header: "Contact Person",
        accessor: "contactPerson",
        Cell: ({ value }) => (
          <span className="whitespace-break-spaces w-[10rem] inline-block">{value}</span>
        ),
        Filter: ({ column }) => (
          <ContactPersonFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        ),
        filter: (rows, columnIds, filterValue) => {
          return rows.filter((row) =>
            row.values.contactPerson
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          );
        },
      },
      {
        Header: "Notes",
        accessor: "note",
        Cell: ({ row }) => (
               <NotesRow row={row}/>
        ),
        Filter: ({ column }) => (
          <NotesFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        ),
        filter: (rows, columnIds, filterValue) => {
          return rows.filter((row) =>
            row.values.note.toLowerCase().includes(filterValue.toLowerCase())
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <StatusRow
            row={row}
            selectedRow={selectedRow}
            handleSelectedRow={handleSelectedRow}
            handleStatusOption={handleStatusOption}
          />
        ),
        Filter: ({ column }) => (
          <StatusFilter
            handleSelectedStatuses={handleSelectedStatuses}
            selectedStatuses={selectedStatuses}
          />
        ),
        filter: (rows, columnIds, filterValue) => {
          if (!filterValue || filterValue.length === 0) return rows;
          return rows.filter((row) => filterValue.includes(row.values.status));
        },
      },
    ],
    [
      selectedTaskTypes,
      selectedStatuses,
      selectedRow,
      dateRange,
      searchTerm,
      selectedTime,
    ]
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
      setFilter("taskType", selectedTaskTypes);
    } else {
      setFilter("taskType", undefined);
    }
  }, [selectedTaskTypes, setFilter]);

  useEffect(() => {
    if (selectedStatuses.length > 0) {
      setFilter("status", selectedStatuses);
    } else {
      setFilter("status", undefined);
    }
  }, [selectedStatuses, setFilter]);

  useEffect(() => {
    if (dateRange.from || dateRange.to) {
      setFilter("createdAt", dateRange);
    } else {
      setFilter("createdAt", undefined);
    }
  }, [dateRange, setFilter]);

  useEffect(() => {
    if (searchTerm) {
      setFilter("entityName", searchTerm);
      setFilter("contactPerson", searchTerm);
      setFilter("note", searchTerm);
    } else {
      setFilter("entityName", undefined);
      setFilter("contactPerson", undefined);
      setFilter("note", undefined);
    }
  }, [searchTerm, setFilter]);

  useEffect(() => {
    if (selectedTime) {
      setFilter("time", selectedTime);
    } else {
      setFilter("time", undefined);
    }
  }, [selectedTime, setFilter]);

  return (
    <div className="overflow-x-auto min-h-96 h-[28rem]">
      <div className="px-6 pb-5 pt-4">
        <span className="text-gray-700 text-sm ">Use the icon {<FaFilter className="text-gray-500 text-xs inline-block"/>} next to the table titles to apply filters</span>
      </div>
      <table className="min-w-full" {...getTableProps()}>
        <TableHead
          headerGroups={headerGroups}
          handleOpenFilter={handleOpenFilter}
          openFilter={openFilter}
        />
        <TableBody
          setOpenFilter={setOpenFilter}
          rows={rows}
          prepareRow={prepareRow}
        />
      </table>
    </div>
  );
};

export default SalesLogTable;
