'use client'
import { useTaskProvider } from "@/context/TaskProvider";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddNotesForm = ({addNoteModal,setAddNoteModel,rowData}) => {
  const { register, handleSubmit, setValue, formState: { errors },reset } = useForm();

  const {fetchTasks,updateTasks,setData} = useTaskProvider();
  const [loading,setLoading] = useState(false);

  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("PM");

  const setrowDataValues = ()=>{

      setValue("entityName", rowData.entityName);
      setValue("date", new Date(rowData.date).toISOString().substring(0, 10));
      
      const timeComponents = rowData.time.match(/(\d+):(\d+) (\w+)/);
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

      setValue("taskType", rowData.taskType);
      setValue("phoneNumber", rowData.phoneNumber);
      setValue("contactPerson", rowData.contactPerson);
      setValue("note", rowData.note);
      setValue("status", rowData.status);
    }

  useEffect(() => {

    setrowDataValues()
   
  }, [setValue]);


  const onSubmit = async(data) => {
    data.time = `${hour}:${minute} ${period}`;

    try {
      setLoading(true);

       const result = await updateTasks(rowData._id,data);
    
      if (result.success) {
        console.log("Task saved successfully");
        setLoading(false);
        reset();
        const res = await fetchTasks();
        setAddNoteModel(false);
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

  return (
    addNoteModal && (
      <div className="fixed inset-0 z-30 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-30"
          onClick={() => setAddNoteModel(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-4">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-sm shadow-lg">
            <div className="max-w-md mx-auto py-3 space-y-3">
              <div className="flex items-center justify-between mb-10">
                <h4 className="uppercase text-lg font-semibold tracking-wider text-black">
                  Add Note
                </h4>

              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="mb-4">
                  <textarea
                    placeholder="Add Note"
                    className="mt-1 resize-none block w-full rounded-md shadow-sm focus:ring-indigo-500 outline-none bg-gray-100 p-4 focus:border-indigo-500 sm:text-sm"
                    {...register("note",{required:true})}
                    cols={5}
                    rows={4}
                  ></textarea>
                  {errors.note && (
                    <p className="text-red-500 text-sm mt-1">Note is required.</p>
                  )}
                </div>

                <div className="flex justify-between">
                 
                <div className="flex items-center">
                  <button
                    type="button"
                    className="mr-4 border border-slate-500 md:px-8 px-5 py-2 rounded-sm"
                    onClick={() => setAddNoteModel(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="md:px-8 flex items-center justify-center gap-2 px-5 py-2 active:scale-95 bg-[#004b6e] text-white rounded-sm"
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

export default AddNotesForm;
