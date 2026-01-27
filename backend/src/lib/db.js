import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to mongoDB ${res.connection.host}`);
    } catch (error) {
    console.log(`Connection to mongoDB error ${error}`);
  }
};


