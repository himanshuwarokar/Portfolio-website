import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    heroDescription: {
      type: String,
      required: true,
      trim: true
    },
    about: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    github: {
      type: String,
      trim: true,
      default: ""
    },
    linkedin: {
      type: String,
      trim: true,
      default: ""
    },
    resumeUrl: {
      type: String,
      trim: true,
      default: ""
    },
    skills: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
