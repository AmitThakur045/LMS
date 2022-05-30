import mongoose from "mongoose";
const { Schema } = mongoose;

const batchSchema = new Schema({
  batchName: {
    type: String,
    required: true,
    trim: true,
  },
  batchCode: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [
    {
      courseName: {
        type: String,
        required: true,
        trim: true,
      },
      courseCode: { type: String, unique: true },
      complete: {
        sectionCompleted: { type: Number },
        lessonCompleted: { type: Number },
        totalLesson: { type: Number },
      },
      lessonVideo: [
        {
          sectionNumber: { type: Number },
          lesson: [
            {
              lessonNumber: { type: Number },
              video: { type: String },
            },
          ],
        },
      ],
    },
  ],
  students: [{ type: String, unique: true }],
});

export default mongoose.model("batch", batchSchema);
