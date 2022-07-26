import mongoose from "mongoose";
const { Schema } = mongoose;
const batchCourseSchema = new Schema({
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
      sectionName: { type: String },
      sectionCompleted: { type: Boolean, default: false },
      lesson: [
        {
          lessonNumber: { type: Number },
          lessonName: { type: String },
          video: { type: String },
          lessonCompleted: { type: Boolean, default: false },
        },
      ],
    },
  ],
});

export default mongoose.model("batchCourse", batchCourseSchema);
