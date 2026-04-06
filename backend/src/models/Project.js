import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    techStack: {
      type: [String],
      default: []
    },
    imageUrl: {
      type: String,
      trim: true,
      default: ""
    },
    liveUrl: {
      type: String,
      trim: true,
      default: ""
    },
    repoUrl: {
      type: String,
      trim: true,
      default: ""
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
