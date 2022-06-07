import mongoose from "mongoose";
const { Schema } = mongoose;

const batchSchema = new Schema({
  batchName: {
    type: String,
    required: true,
    trim: true,
  },
  subAdmin: { type: String },
  organizationName: { type: String },
  batchCode: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [
    {
      assignment: [
        {
          assignmentName: { type: String },
          assignmentCode: { type: String },
          assignmentPdf: { type: String },
        },
      ],
      courseName: {
        type: String,
        required: true,
        trim: true,
      },
      courseCode: { type: String },
      complete: {
        sectionCompleted: { type: Number },
        lessonCompleted: { type: Number },
        totalLesson: { type: Number },
      },
      lessonVideo: [
        {
          sectionNumber: { type: Number },
          sectionCompleted: { type: Boolean, default: false },
          lesson: [
            {
              lessonNumber: { type: Number },
              video: { type: String },
              lessonCompleted: { type: Boolean, default: false },
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
  students: [{ type: String }],
  batchLink: { type: String },
});

export default mongoose.model("batch", batchSchema);
