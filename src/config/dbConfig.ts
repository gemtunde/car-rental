import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.mongoDB_url!);

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connection successful");
    });

    connection.on("error", (error) => {
      //console.log("MongoDB connection failed");
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}
