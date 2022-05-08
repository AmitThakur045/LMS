import mongoose from "mongoose";
const { Schema } = mongoose;
const facultySchema = new Schema({
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
  },
  gender: {
    type: String,
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
  contactNumber: {
    type: Number,
  },
  dob: {
    type: String,
    required: true,
  },
});

export default mongoose.model("faculty", facultySchema);
