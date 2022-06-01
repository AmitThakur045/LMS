import mongoose from "mongoose";
const { Schema } = mongoose;

const assignmentSchema = new Schema({
  assignmentCode: {
    type: String,
    required: true,
    unique: true,
  },
  assignment: {
    type: String,
    required: true,
    trim: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
  batchCode: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    default: 10,
  },
  date: {
    type: String,
    required: true,
  },
});

export default mongoose.model("assignment", assignmentSchema);
