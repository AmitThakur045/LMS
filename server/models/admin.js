import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    dob: {
      type: String,
    },
    avatar: {
      type: String,
    },
    contactNumber: {
      type: Number,
    },
    sub: {
      type: String,
    },
    organizationName: { type: String },
    passwordUpdated: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
    },
  },
  { strict: false }
);

export default mongoose.model("admin", adminSchema);
