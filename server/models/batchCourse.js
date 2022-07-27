import mongoose from "mongoose";
const { Schema } = mongoose;
const batchCourseSchema = new Schema({
  assignment: [
    {
      type: Schema.Types.ObjectId,
      ref: "batchAssignment",
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
  lessonVideo: [{ type: Schema.Types.ObjectId, ref: "batchLessonVideo" }],
});

export default mongoose.model("batchCourse", batchCourseSchema);
