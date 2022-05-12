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
  courses: [{ type: String }],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "student",
    },
  ],
});

export default mongoose.model("batch", batchSchema);
