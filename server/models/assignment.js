import mongoose from "mongoose";

const assignmentSchema = mongoose.Schema({
  assignment: {
    type: String,
    required: true,
    trim: true,
  },
  batchCode: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    default: 10,
  },
  year: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export default mongoose.model("assignment", assignmentSchema);