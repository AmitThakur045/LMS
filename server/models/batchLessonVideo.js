import mongoose from "mongoose";
const { Schema } = mongoose;
const batchLessonVideoSchema = new Schema({
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
});
export default mongoose.model("batchLessonVideo", batchLessonVideoSchema);
