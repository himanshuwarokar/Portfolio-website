import { Router } from "express";
import Message from "../models/Message.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  const createdMessage = await Message.create({ name, email, subject, message });
  return res.status(201).json({
    message: "Message sent successfully.",
    data: createdMessage
  });
});

router.get("/", async (_req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  return res.json(messages);
});

export default router;
