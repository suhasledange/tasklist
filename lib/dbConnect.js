import mongoose from "mongoose";

const connection={}
const MONGOURI = `mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@cluster0.37bvyxf.mongodb.net/taskDB?retryWrites=true&w=majority&appName=Cluster0`


async function dbConnect(){

    if(connection.isConnected){
        console.log("Already connected to database");
        return
    }

    try {
           const db = await mongoose.connect(MONGOURI || "")
           connection.isConnected = db.connections[0].readyState;
           console.log("db connected succesfully");
    
        } catch (error) {
            console.log("db connection failed!!!",error);
            process.exit(1)
    }

}

export default dbConnect;