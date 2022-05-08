import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  batch: [
    {
      type: Schema.Types.ObjectId,
      course: {
        type: Schema.Types.ObjectId,
        ref: "course",
      },
      ref: "batch",
    },
  ],
  gender: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  fatherContactNumber: {
    type: Number,
  },
  dob: {
    type: String,
    required: true,
  },
  assignment: [
    {
      assignmentCode: String,
      courseCode: String,
      batchCode: String,
    },
  ],
  passwordUpdated: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("student", studentSchema);
