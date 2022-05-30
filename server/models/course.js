import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
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
  description: {
    type: String,
    required: true,
  },
  totalLectures: {
    type: Number,
    required: true,
  },
  courseImg: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  section: [
    {
      sectionNumber: { type: Number },
      sectionName: { type: String },
      sectionCompleted: { type: Boolean, default: false },
      lesson: [
        {
          lessonNumber: { type: Number },
          lessonName: { type: String },
          lessonCompleted: { type: Boolean, default: false },
          lessonVideo: { type: String, default: false },
          lessonDescription: { type: String },
        },
      ],
    },
  ],
});

export default mongoose.model("course", courseSchema);
