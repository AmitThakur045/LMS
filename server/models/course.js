import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  batchCode: {
    type: String,
    ref: "batch",
  },
  description: {
    type: String,
    required: true,
  },
  totalLectures: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: String,
  },
  year: {
    type: String,
    required: true,
  },
});

export default mongoose.model("course", courseSchema);
