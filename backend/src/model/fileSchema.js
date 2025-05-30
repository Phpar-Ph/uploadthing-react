import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  file: [
    {
      fileLink: {
        type: String,
        required: true,
      },
      imageKey: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
    },
  ],
  // uploadedBy: {
  //   type: String,
  //   required: true,
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const File = mongoose.models.File || mongoose.model("File", fileSchema);
export default File;
