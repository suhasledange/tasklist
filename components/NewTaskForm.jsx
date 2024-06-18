'use client'
import { useTaskProvider } from "@/context/TaskProvider";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const NewTaskForm = ({ setData,formModal, setFormModal ,initialTask}) => {
  const { register, handleSubmit, setValue, watch, formState: { errors },reset } = useForm();
  const status = watch("status");

  useEffect(() => {

    if (initialTask) {
      setValue("entityName", initialTask.entityName);
      setValue("date", new Date(initialTask.date).toISOString().substring(0, 10));
      setValue("time", initialTask.time);
      setValue("taskType", initialTask.taskType);
      setValue("phoneNumber", initialTask.phoneNumber);
      setValue("contactPerson", initialTask.contactPerson);
      setValue("note", initialTask.note);
      setValue("status", initialTask.status);
    } else {
      setValue("status", "Open");
    }

  }, [setValue, initialTask]);


  const {fetchTasks,addTasks,updateTasks,deleteTask} = useTaskProvider();


  const handleDelete = async()=>{
      
    try {
      if(initialTask){
        const result = await deleteTask(initialTask._id);
        if (result.success) {
          console.log("Task saved successfully", result.task);
          reset();
          const res = await fetchTasks();
          setData(res);
          setFormModal(false);
        } else {
          console.error("Error saving task", result.error);
        }

      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
    
 
 
  }

  const onSubmit = async(data) => {
    
    try {
      let result
      if(initialTask){
        result = await updateTasks(initialTask._id,data);
      }
      else{
        result = await addTasks(data);
      }

      if (result.success) {
        console.log("Task saved successfully", result.task);
        reset();
        const res = await fetchTasks();
        setData(res);
        setFormModal(false);
      } else {
        console.error("Error saving task", result.error);
      }
    } catch (error) {
      console.error("Error submitting form", error);
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
                  {initialTask ? "Edit Task":"New Task"}
                </h4>

                <div className="flex justify-end">
                  <button
                    className={`px-4 py-2 ${
                      status === "Open"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleStatusChange("Open")}
                  >
                    Open
                  </button>
                  <button
                    className={`px-4 py-2 ${
                      status === "Closed"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleStatusChange("Closed")}
                  >
                    Closed
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="hidden"
                  {...register("status", { required: true })}
                />
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
                <div className="mb-4 flex items-center justify-center gap-10">
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 outline-none bg-gray-100 p-4 focus:border-indigo-500 sm:text-sm"
                    {...register("date", { required: true })}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">date is required.</p>
                  )}

                  <input
                    type="time"
                    className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 outline-none bg-gray-100 p-4 focus:border-indigo-500 sm:text-sm"
                    {...register("time", { required: true })}
                  />
                   {errors.time && (
                    <p className="text-red-500 text-sm mt-1">time is required.</p>
                  )}

                </div>
                <div className="mb-4">
                  <select
                    className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 outline-none bg-gray-100 p-4 focus:border-indigo-500 sm:text-sm"
                    {...register("taskType", { required: true })}
                  >
                    <option value="Call">
                      Call
                    </option>
                    <option value="Meeting">
                      Meeting
                    </option>
                    <option value="Video Call">
                      Video Call
                    </option>
                  </select>
                </div>
                <div className="mb-4">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 outline-none bg-gray-100 p-4 focus:border-indigo-500 sm:text-sm ${
                      errors.phoneNumber ? 'border-red-500' : ''
                    }`}
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
                  <div className="">

                  <button
                    onClick={handleDelete}
                    type="button"
                    className="px-8 py-2 active:scale-95 bg-red-600 text-white rounded-sm"
                  >
                    Delete
                  </button>

                  </div>
                <div className="">
                  <button
                    type="button"
                    className="mr-4 px-8 py-2 rounded-sm"
                    onClick={() => setFormModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2 active:scale-95 bg-[#004b6e] text-white rounded-sm"
                  >
                    Save
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
