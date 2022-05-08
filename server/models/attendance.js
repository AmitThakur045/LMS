import mongoose from "mongoose";
const { Schema } = mongoose;

const attendenceSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  batch: {
    type: Schema.Types.ObjectId,
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
