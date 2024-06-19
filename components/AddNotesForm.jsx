'use client'
import { useTaskProvider } from "@/context/TaskProvider";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddNotesForm = ({addNoteModal,setAddNoteModel,initialTask}) => {
  const { register, handleSubmit, setValue, formState: { errors },reset } = useForm();

  const {fetchTasks,updateTasks,setData} = useTaskProvider();

  const setInitialTaskValues = ()=>{

      setValue("entityName", initialTask.entityName);
      setValue("date", new Date(initialTask.date).toISOString().substring(0, 10));
      setValue("time", initialTask.time);
      setValue("taskType", initialTask.taskType);
      setValue("phoneNumber", initialTask.phoneNumber);
      setValue("contactPerson", initialTask.contactPerson);
      setValue("note", initialTask.note);
      setValue("status", initialTask.status);
    }

  useEffect(() => {

    setInitialTaskValues()
   
  }, [setValue]);


  const onSubmit = async(data) => {
    
    try {

       const result = await updateTasks(initialTask._id,data);
    
      if (result.success) {
        console.log("Task saved successfully");
        reset();
        const res = await fetchTasks();
        setData(res);
        setAddNoteModel(false);
      } else {
        console.error("Error saving task", result.error);
      }
    } catch (error) {
      console.error("Error submitting form", error);
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
                 
                <div>
                  <button
                    type="button"
                    className="mr-4 border border-slate-500 md:px-8 px-5 py-2 rounded-sm"
                    onClick={() => setAddNoteModel(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="md:px-8 px-5 py-2 active:scale-95 bg-[#004b6e] text-white rounded-sm"
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

export default AddNotesForm;
