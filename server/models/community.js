import mongoose from "mongoose";
const { Schema } = mongoose;

const communitySchema = new Schema({
  communityType: { type: String },
  batchCode: { type: String },
  problem: [{ type: Schema.Types.ObjectId, ref: "problem" }],
  problemCategories: [{ category: { type: String, default: "General" } }],
});

export default mongoose.model("community", communitySchema);
