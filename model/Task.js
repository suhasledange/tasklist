import mongoose,{Schema} from "mongoose";

const TaskSchema = new Schema({

    contactPerson:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    entityName:{
        type:String,
        required:true
    },
    note:{
        type:String,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['Open','Closed'],
        default:'Open',
        required:true
    },
    taskType:{
        type:String,
        enum:['Call','Video Call','Meeting'],
        required:true,
    },
    time:{
        type:String,
        required:true,
    }
}
,{
    timestamps:true
})

const Task = mongoose.models.tasks || mongoose.model('tasks',TaskSchema);
export default Task