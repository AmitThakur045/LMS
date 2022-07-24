import mongoose from "mongoose";
const { Schema } = mongoose;

const organizationSchema = new Schema({
  organizationName: { type: String, unique: true },
  organizationEmails: [{ type: String }],
});

export default mongoose.model("organization", organizationSchema);
