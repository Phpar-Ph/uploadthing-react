import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  fileLink: [String],
  imageKey: String,
});

const File = mongoose.models.File || mongoose.model("File", fileSchema);
export default File;
