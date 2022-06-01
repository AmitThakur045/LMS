import mongoose from "mongoose";
const { Schema } = mongoose;

const assignmentSchema = new Schema({
  assignmentCode: {
    type: String,
    required: true,
    unique: true,
  },
  assignmentDescription: {
    type: String,
    required: true,
  },
  assignmentPdf: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
  batchCode: {
    type: String,
    required: true,
  },
  assignmentDate: {
    type: String,
    required: true,
  },
});

export default mongoose.model("assignment", assignmentSchema);
