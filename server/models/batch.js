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
      assignment: [
        {
          assignmentName: { type: String, required: true },
          assignmentCode: { type: String, required: true },
          assignmentPdf: { type: String, required: true },
        },
      ],
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
  schedule: [
    {
      title: { type: String },
      link: { type: String },
      start: { type: String },
      end: { type: String },
      courseCode: { type: String },
    },
  ],
  students: [{ type: String, unique: true }],
});

export default mongoose.model("batch", batchSchema);
