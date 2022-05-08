import mongoose from "mongoose";
const { Schema } = mongoose;
const marksSchema = new Schema({
  assignment: {
    type: Schema.Types.ObjectId,
    ref: "assignment",
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  marks: {
    type: Number,
    default: -1,
  },
});

export default mongoose.model("marks", marksSchema);
