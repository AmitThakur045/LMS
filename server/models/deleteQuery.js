import mongoose from "mongoose";
const { Schema } = mongoose;

const deleteQuerySchema = new Schema({
  subAdmin: { type: String },
  status: { type: Boolean },
  resolveBy: { type: String },
  code: { type: String },
  avatar: { type: String },
  updated: { type: Boolean, default: false },
});

export default mongoose.model("deleteQuery", deleteQuerySchema);
