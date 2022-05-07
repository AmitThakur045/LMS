import mongoose from "mongoose";
const { Schema } = mongoose;

const batchSchema = new Schema({
  batchName: {
    type: String,
    required: true,
    trim: true,
  },
  batchCode: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [
    {
      courseCode: String,
      ref: "course",
    },
  ],
  year: {
    type: String,
    required: true,
  }
});

export default mongoose.model("batch", batchSchema);