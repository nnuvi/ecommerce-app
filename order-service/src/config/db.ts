import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  try {
    if (isConnected) return;

    if(!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in env file!")
    }

    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    isConnected = true
    
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;