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
  status: { type: Boolean, default: true },
  courses: [{ type: Schema.Types.ObjectId, ref: "batchCourse" }],
  schedule: [{ type: Schema.Types.ObjectId, ref: "schedule" }],
  students: [{ type: String }],
  batchLink: { type: String },
});

export default mongoose.model("batch", batchSchema);
