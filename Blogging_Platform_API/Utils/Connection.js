import mongoose from "mongoose";

const Connection = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connection to db is succcessfully connected.");
  } catch (error) {
    console.log({ error, message: "Error from Connection.js" });
    process.exit(0);
  }
};

export default Connection;
