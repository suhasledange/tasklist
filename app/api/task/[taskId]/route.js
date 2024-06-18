import dbConnect from "@/lib/dbConnect";
import Task from "@/model/Task";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
    let data = {};
    const id = content.params.taskId;
    const ID = {_id:id};
    try {
        await dbConnect();
        const updatedData = await request.json();
        const updatedTask = await Task.findOneAndUpdate(ID,updatedData);
        
        if (updatedTask) {
            data = { success: true, task: updatedTask };
        } else {
            data = { success: false, error: 'Task not found' };
        }
    } catch (error) {
        data = { success: false, error: error.message };
    }

    return NextResponse.json(data);
}

export async function DELETE(request, content) {
    let data = {};
    const id = content.params.taskId;
    const ID = {_id:id};
    try {
        await dbConnect();
        const deletedTask = await Task.findOneAndDelete(ID);

        if (deletedTask) {
            data = { success: true, task: deletedTask };
        } else {
            data = { success: false, error: "Task not found" };
        }
    } catch (error) {
        data = { success: false, error: error.message };
    }

    return NextResponse.json(data);
}