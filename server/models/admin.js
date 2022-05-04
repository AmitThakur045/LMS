import mongoose from "mongoose";

const adminSchema = mongoose.Schema({}, { strict: false });

export default mongoose.model("admin", adminSchema);
