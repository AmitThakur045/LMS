import mongoose from "mongoose";
const { Schema } = mongoose;

const attendenceSchema = new Schema({
  batchCode: { type: String },
  courseCode: { type: String },
  date: { type: String },
  students: [{ email: { type: String }, present: { type: Boolean } }],
});

export default mongoose.model("attendance", attendenceSchema);
