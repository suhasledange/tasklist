import dbConnect from "@/lib/dbConnect";
import Task from "@/model/Task";
import { NextResponse } from "next/server";

export async function GET(){

    let data =[]
        
    try {
        await dbConnect()
        data = await Task.find().sort({createdAt:-1});
    } catch (error) {
        data={success:false}
    }

    return NextResponse.json({result:data})
}

export async function POST(request) {
    
    let data = {};
    try {
        await dbConnect();
        const taskData = await request.json();
        const newTask = new Task(taskData);
        await newTask.save();
        data = { success: true, task: newTask };
    } catch (error) {
        data = { success: false, error: error.message };
    }

    return NextResponse.json(data);
}

export async function PUT(request, { params }) {
    let data = {};
    const { id } = params;

    try {
        await dbConnect();
        const updatedData = await request.json();
        const updatedTask = await Task.findByIdAndUpdate(id, updatedData, { new: true });
        
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

export async function DELETE(request, { params }) {
    let data = {};
    const { id } = params;

    try {
        await dbConnect();
        const deletedTask = await Task.findByIdAndDelete(id);

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