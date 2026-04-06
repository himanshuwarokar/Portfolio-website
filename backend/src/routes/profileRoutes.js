import { Router } from "express";
import Profile from "../models/Profile.js";
import { defaultProfile } from "../data/defaultProfile.js";

const router = Router();

router.get("/", async (_req, res) => {
  const profile = await Profile.findOne();
  return res.json(profile || defaultProfile);
});

router.put("/", async (req, res) => {
  const data = req.body;

  if (!data.fullName || !data.title || !data.heroDescription || !data.about || !data.email) {
    return res
      .status(400)
      .json({ message: "fullName, title, heroDescription, about, and email are required." });
  }

  const existingProfile = await Profile.findOne();

  if (!existingProfile) {
    const created = await Profile.create(data);
    return res.status(201).json(created);
  }

  existingProfile.set(data);
  await existingProfile.save();
  return res.json(existingProfile);
});

export default router;
