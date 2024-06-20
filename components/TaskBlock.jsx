import React, { useState } from "react";
import { TbCirclePlus } from "react-icons/tb";
import SalesLogTable from "./SalesLogTable";
import NewTaskForm from "./NewTaskForm";
import { useTaskProvider } from "@/context/TaskProvider";
import { LinearProgress } from "@mui/material";

const TaskBlock = () => {
  const { loading, data, setData } = useTaskProvider();
  const [formModal, setFormModal] = useState(false);
  const [initialTask, setInitialTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditTask = (task) => {
    setInitialTask(task);
    setFormModal(true);
  };

  const handleAddTask = () => {
    setInitialTask(null);
    setFormModal(true);
  };

  const filteredData = data.filter((item) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return (
      item.entityName.toLowerCase().includes(lowerCaseSearch) ||
      item.contactPerson.toLowerCase().includes(lowerCaseSearch) ||
      item.note.toLowerCase().includes(lowerCaseSearch)
    );
  });

  return (
    <>
      <NewTaskForm
        setData={setData}
        formModal={formModal}
        setFormModal={setFormModal}
        initialTask={initialTask}
      />
      <div className="flex flex-col max-w-7xl w-full mx-auto shadow-slate-400 shadow-md my-8 ">
        <div className="flex md:flex-row flex-col md:items-center md:gap-0 gap-5 justify-between px-4 py-5 bg-gray-200/[0.5]">
          <div className="flex md:gap-8 gap-12  items-center">
            <h1 className="font-bold text-sm md:text-md tracking-wider uppercase">
              Sales Log
            </h1>
            <button
              onClick={handleAddTask}
              className="active:scale-95 border-2 md:text-md text-sm border-black/[0.5] rounded-sm py-2 px-4 gap-3 flex items-center justify-center"
            >
              <TbCirclePlus className="text-xl  text-blue" />
              New Task
            </button>
          </div>
          <div className="flex-end w-full md:w-[40%]">
            <input
              type="text"
              placeholder="Search Entity, Contact Person & Notes"
              className="p-2 px-5 outline-none rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className={`bg-white ${filteredData.length ? "pt-3" : ""}`}>
          {loading ? (
            <LinearProgress />
          ) : filteredData.length === 0 ? (
            <div className="px-4 py-4">No Data found</div>
          ) : (
            <SalesLogTable data={filteredData} handleEditTask={handleEditTask} />
          )}
        </div>
      </div>
    </>
  );
};

export default TaskBlock;
