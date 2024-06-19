'use client'
import { createContext, useContext, useEffect, useState } from 'react';
const context = createContext();

export const TaskProvider = ({ children }) => {

  const [data,setData] = useState([]);
    

    const fetchTasks = async()=>{

        try {
    
          const res = await fetch('/api/task');
          const data = await res.json();
          return data.result
    
        } catch (error) {
          console.log("Error fetching tasks",error)
        }
    
      }

    const addTasks = async(data)=>{
            try {
                const response = await fetch('/api/task', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  });

                  return response.json();
            } catch (error) {
                console.log("error adding task",error);
            }
    }

    const updateTasks = async (id, taskData) => {

        const response = await fetch(`/api/task/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });
        return await response.json();

    };

    const deleteTask = async (id) => {
      
        try {
            const response = await fetch(`/api/task/${id}`, {
                method: 'DELETE',
            });
            return response.json();
        } catch (error) {
            console.log("Error deleting task", error);
        }

        
    };


    const handleDupliAndStatus = async (data,msg,change)=>{
      try {
  
        if (confirm(msg)) {
          const {
            contactPerson,
            date,
            entityName,
            note,
            phoneNumber,
            status,
            taskType,
            time,
          } = data;
  
          let updateStatus = status;
          
          if(change) updateStatus = status === 'Closed' ? "Open" : "Closed";
          
          const dataToSend = {
            contactPerson,
            date,
            entityName,
            note,
            phoneNumber,
            status:updateStatus,
            taskType,
            time,
          };
  
  
          let result;
          if(change) result = await updateTasks(data._id,dataToSend);
          else result = await addTasks(dataToSend);
  
          if (result.success) {
            console.log("Task saved successfully");
            const res = await fetchTasks();
            setData(res);
          } else {
            console.error("Error duplicating saving task", result.error);
          }
        }
      } catch (error) {
        console.error("Error submitting", error);
      }
    }
  

    const handleChangeStatus = async(data,newStatus)=>{
      try {
  
        const {
          contactPerson,
          date,
          entityName,
          note,
          phoneNumber,
          status,
          taskType,
          time,
        } = data;

        if(status === newStatus) return;
        else {
        if (confirm("Do you want to change status ?")) {
         
          const dataToSend = {
            contactPerson,
            date,
            entityName,
            note,
            phoneNumber,
            status:newStatus,
            taskType,
            time,
          };

          const result = await updateTasks(data._id,dataToSend);

          if (result.success) {
            console.log("Task saved successfully");
            const res = await fetchTasks();
            setData(res);
          } else {
            console.error("Error duplicating saving task", result.error);
          }
        }
      }
      } catch (error) {
        console.error("Error submitting", error);
      }
    }

    const fetchData = async()=>{

      try {
        const res = await fetchTasks();
        setData(res)
  
      } catch (error) {
        console.log("Error fetching tasks",error)
      }
  
    }
    useEffect(()=>{
  
      fetchData();
  
    },[])
  

   
    return (
        <context.Provider value={{ fetchTasks,addTasks,updateTasks,deleteTask,handleDupliAndStatus,handleChangeStatus,data,setData }}>
            {children}
        </context.Provider>
    );
};

export const useTaskProvider = () => useContext(context);
