'use client'
import { createContext, useContext, useEffect, useState } from 'react';
const context = createContext();

export const TaskProvider = ({ children }) => {
    

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
   
    return (
        <context.Provider value={{ fetchTasks,addTasks,updateTasks,deleteTask }}>
            {children}
        </context.Provider>
    );
};

export const useTaskProvider = () => useContext(context);
