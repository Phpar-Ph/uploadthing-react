import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("connected to mongoDB")
  );
  await mongoose.connect(`${process.env.MONGODB_URL}/file-upload`);
};

export default connectDB;
