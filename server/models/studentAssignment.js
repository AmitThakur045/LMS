import mongoose from "mongoose";
const { Schema } = mongoose;
const studentAssignmentSchema = new Schema({
  assignmentCode: { type: String },
  studentAnswer: { type: String },
  checkedAssignment: { type: String },
  score: { type: Number, default: 0 },
});

export default mongoose.model("studentAssignment", studentAssignmentSchema);
