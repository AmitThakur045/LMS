import mongoose from "mongoose";
const { Schema } = mongoose;

const marksSchema = new Schema({
  assignment: {
    assignmentCode: String,
    ref: "assignment",
  },
  student: {
    email: String,
    ref: "student",
  },
  marks: {
    type: Number,
    default: -1,
  },
});

export default mongoose.model("marks", marksSchema);