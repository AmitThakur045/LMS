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
  courses: [{ type: String, unique: true }],
  students: [{ type: String, unique: true }],
});

export default mongoose.model("batch", batchSchema);
