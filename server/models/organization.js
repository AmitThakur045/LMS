import mongoose from "mongoose";
const { Schema } = mongoose;

const organizationSchema = new Schema({
  organizationName: { type: String, unique: true },
});

export default mongoose.model("organization", organizationSchema);
