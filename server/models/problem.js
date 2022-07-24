import mongoose from "mongoose";
const { Schema } = mongoose;

const problemSchema = new Schema({
  problemName: { type: String },
  problemDescription: { type: String },
  problemCategory: { type: String },
  by: { type: String },
  time: { type: String },
  reply: [{ solution: { type: String }, by: { type: String } }],
});

export default mongoose.model("problem", problemSchema);
