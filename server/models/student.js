import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema({
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
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  batchCode: [
    {
      type: String,
    },
  ],
  contactNumber: {
    type: Number,
  },
  dob: {
    type: String,
    required: true,
  },
  currentActiveBatch: {
    type: String,
  },
  performance: {
    type: String,
  },
  dateOfJoining: {
    type: String,
  },
  assignment: [
    {
      type: Schema.Types.ObjectId,
      ref: "studentAssignment",
    },
  ],
  attendance: [
    {
      batchCode: { type: String },
      courseCode: { type: String },
      attended: { type: Number },
    },
  ],
});

export default mongoose.model("student", studentSchema);
