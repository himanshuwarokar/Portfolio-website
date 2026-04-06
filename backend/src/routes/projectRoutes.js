import { Router } from "express";
import Project from "../models/Project.js";

const router = Router();

router.get("/", async (_req, res) => {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
  res.json(projects);
});

router.post("/", async (req, res) => {
  const { title, description, techStack, imageUrl, liveUrl, repoUrl, featured } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  const project = await Project.create({
    title,
    description,
    techStack: Array.isArray(techStack)
      ? techStack
      : typeof techStack === "string"
      ? techStack.split(",").map((item) => item.trim()).filter(Boolean)
      : [],
    imageUrl,
    liveUrl,
    repoUrl,
    featured: Boolean(featured)
  });

  return res.status(201).json(project);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updated = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updated) {
    return res.status(404).json({ message: "Project not found." });
  }

  return res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Project.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Project not found." });
  }

  return res.json({ message: "Project deleted." });
});

export default router;
