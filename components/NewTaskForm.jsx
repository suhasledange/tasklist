'use client'
import { useTaskProvider } from "@/context/TaskProvider";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const NewTaskForm = ({ setData, formModal, setFormModal, initialTask }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm();
  const status = watch("status");

  const { fetchTasks, addTasks, updateTasks, deleteTask } = useTaskProvider();
  const [loading,setLoading] = useState(false);
  const [delLoading,setDelLoading] = useState(false);


  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("PM");

  const setInitialTaskValues = () => {
    if (initialTask) {
      setValue("entityName", initialTask.entityName);
      setValue("date", new Date(initialTask.date).toISOString().substring(0, 10));
  
      const timeComponents = initialTask.time.match(/(\d+):(\d+) (\w+)/);
      if (timeComponents && timeComponents.length === 4) {
        const hour = timeComponents[1];
        const minute = timeComponents[2];
        const period = timeComponents[3];
  
        setHour(hour);
        setMinute(minute);
        setPeriod(period);
      } else {
        setHour("12");
        setMinute("00");
        setPeriod("PM");
      }
  
      setValue("taskType", initialTask.taskType);
      setValue("phoneNumber", initialTask.phoneNumber);
      setValue("contactPerson", initialTask.contactPerson);
      setValue("note", initialTask.note);
      setValue("status", initialTask.status);
    } else {
      setValue("entityName", "");
      setValue("date", "");
      setHour("12");
      setMinute("00");
      setPeriod("PM");
      setValue("taskType", "Call");
      setValue("phoneNumber", "");
      setValue("contactPerson", "");
      setValue("note", "");
      setValue("status", "Open");
    }
  };
  

  useEffect(() => {
    setInitialTaskValues()
  }, [setValue, initialTask]);

  const handleDelete = async () => {
    try {
      if (initialTask) {
        if (confirm("Do you want to delete this task ?")) {
          setDelLoading(true);
          const result = await deleteTask(initialTask._id);
          if (result.success) {
            console.log("Task deleted successfully");
            setDelLoading(false);
            reset();
            const res = await fetchTasks();
            setFormModal(false);
            setData(res);
          } else {
            console.error("Error saving task", result.error);
            setDelLoading(false);
          }
        }
        else return
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
    finally{
      setDelLoading(false);
    }
  }

  const onSubmit = async (data) => {

    data.time = `${hour}:${minute} ${period}`;
    try {

      let result
      setLoading(true);
      if (initialTask) {
        result = await updateTasks(initialTask._id, data);
      }
      else {
        result = await addTasks(data);
      }

      if (result.success) {
        console.log("Task saved successfully");
        setLoading(false);
        reset();
        const res = await fetchTasks();
        setFormModal(false);
        setData(res);
      } else {
        console.error("Error saving task", result.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
    finally{
      setLoading(false);
    }
  };

  const handleStatusChange = (status) => {
    setValue("status", status);
  };

  return (
    formModal && (
      <div className="fixed inset-0 z-30 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-30"
          onClick={() => setFormModal(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-4">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-sm shadow-lg">
            <div className="max-w-md mx-auto py-3 space-y-3">
              <div className="flex items-center justify-between mb-10">
                <h4 className="uppercase text-lg font-semibold tracking-wider text-black">
                  {initialTask ? "Edit Task" : "New Task"}
                </h4>

                <div className="flex justify-end">
                  <button
                    className={`px-4 py-2 ${status === "Open" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
                    onClick={() => handleStatusChange("Open")}
                  >
                    Open
                  </button>
                  <button
                    className={`px-4 py-2 ${status === "Closed" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
                    onClick={() => handleStatusChange("Closed")}
                  >
                    Closed
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("status", { required: true })} />
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Entity name"
                    className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 outline-none bg-gray-100 p-4 focus:border-indigo-500 sm:text-sm"
                    {...register("entityName", { required: true })}
                  />
                  {errors.entityName && (
                    <p className="text-red-500 text-sm mt-1">Entity name is required.</p>
                  )}
                </div>
                <div className="mb-4 flex md:flex-row flex-col items-center justify-between gap-2">
                  <input
                    type="date"
                    placeholder="Date"
                    className="mt-1 w-full block rounded-md shadow-sm focus:ring-indigo-500 outline-none bg-gray-100 p-4 focus:border-indigo-500 sm:text-sm"
                    {...register("date", { required: true })}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">Date is required.</p>
                  )}

                  <div className="flex w-full">
                    <select
                      value={hour}
                      onChange={(e) => setHour(e.target.value)}
                      className="mt-1 md:w-auto w-full rounded-l-md outline-none bg-gray-100 p-4 sm:text-sm"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                        <option key={h} value={h < 10 ? `0${h}` : h}>{h < 10 ? `0${h}` : h}</option>
                      ))}
                    </select>
                    <select
                      value={minute}
                      onChange={(e) => setMinute(e.target.value)}
                      className="mt-1 md:w-auto w-full block outline-none bg-gray-100 p-4 sm:text-sm"
                    >
                      {Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : i)).map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="mt-1 md:w-auto w-full rounded-r-md outline-none bg-gray-100 p-4 sm:text-sm"
                    >
                      {["AM", "PM"].map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <select
                    className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 outline-none bg-gray-100 p-4 focus:border-indigo-500 sm:text-sm"
                    {...register("taskType", { required: true })}
                  >
                    <option value="Call">Call</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Video Call">Video Call</option>
                  </select>
                </div>
                <div className="mb-4">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 outline-none bg-gray-100 p-4 focus:border-indigo-500 sm:text-sm ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    {...register("phoneNumber", {
                      required: true,
                      minLength: 10,
                      maxLength: 10,
                      pattern: /^[0-9]*$/,
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">Phone number must be 10 digits</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Contact person"
                    className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 outline-none bg-gray-100 p-4 focus:border-indigo-500 sm:text-sm"
                    {...register("contactPerson", { required: true })}
                  />
                  {errors.contactPerson && (
                    <p className="text-red-500 text-sm mt-1">Contact person is required.</p>
                  )}
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Note (optional)"
                    className="mt-1 resize-none block w-full rounded-md shadow-sm focus:ring-indigo-500 outline-none bg-gray-100 p-4 focus:border-indigo-500 sm:text-sm"
                    {...register("note")}
                    cols={5}
                    rows={4}
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <div>
                    {initialTask && (
                      <button
                        onClick={handleDelete}
                        type="button"
                        className="md:px-8 px-5 py-2 active:scale-95 bg-red-600 text-white rounded-sm flex items-center justify-center gap-2"
                      >
                        Delete
                        { delLoading && <CircularProgress color="warning" size={18}/>}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="mr-4 border border-slate-500 md:px-8 px-5 py-2 rounded-sm"
                      onClick={() => setFormModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="md:px-8 px-5 py-2 active:scale-95 bg-[#004b6e] flex items-center justify-center gap-2 text-white rounded-sm"
                    >
                      Save 
                      {loading && <CircularProgress size={18}/>}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NewTaskForm;
