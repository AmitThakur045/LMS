import mongoose from "mongoose";
const { Schema } = mongoose;

const scheduleSchema = new Schema({
  title: { type: String },
  link: { type: String },
  start: { type: String },
  end: { type: String },
  courseCode: { type: String },
});

export default mongoose.model("schedule", scheduleSchema);
