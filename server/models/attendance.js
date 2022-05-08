import mongoose from "mongoose";
const { Schema } = mongoose;

const attendenceSchema = new Schema({
  student: {
    email: String,
    ref: "student",
  },
  batch: {
    batchCode: String,
    ref: "batch",
  },
  totalLecturesByFaculty: {
    type: Number,
    default: 0,
  },
  lectureAttended: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("attendance", attendenceSchema);