import mongoose from "mongoose";
const { Schema } = mongoose;
const batchAssignmentSchema = new Schema({
  assignmentName: { type: String },
  assignmentCode: { type: String },
  assignmentPdf: { type: String },
});

export default mongoose.model("batchAssignment", batchAssignmentSchema);
