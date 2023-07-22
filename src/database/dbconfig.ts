import mongoose from "mongoose";

export const dbconnection = async (url: any) => {
  await mongoose.connect(url);
  console.log("db connect");
};
