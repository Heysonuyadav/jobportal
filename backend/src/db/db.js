import mongoose from "mongoose";
import config from '../config/config.js';


const connectDB = async () => {

    mongoose.connect(config.MONGODB_URL)
    .then(() => {
        console.log("MongoDB connected successfully");
    }).catch((error)=>{
        console.error("MongoDB connection failed:", error.message);
    })
}

export default connectDB;