import mongoose from "mongoose";
import { env } from "@/env.mjs";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDb is already connected");
    return;
  }
  try {
    await mongoose.connect(env.MONGODB_URI, {
      dbName: "auth-themes-stripe",
    });
    isConnected = true;
    console.log("MongoDb is connected");
  } catch (error) {
    console.log("Error While Connecting to MongoDB");
  }
};