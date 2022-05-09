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
      lesson: [
        {
          lessonNumber: { type: Number },
          lessonName: { type: String },
          lessonDescription: { type: String },
        },
      ],
    },
  ],
});

export default mongoose.model("course", courseSchema);
