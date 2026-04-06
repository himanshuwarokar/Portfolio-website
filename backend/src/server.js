import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

const normalizeOrigin = (value) => {
  const trimmed = value?.trim();
  if (!trimmed) {
    return "";
  }

  try {
    return new URL(trimmed).origin;
  } catch {
    return trimmed.replace(/\/+$/, "");
  }
};

const configuredOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean);

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...configuredOrigins
]);

const isVercelOrigin = (origin) => {
  try {
    return new URL(origin).hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
};

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser clients (curl/Postman) that do not send Origin.
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = normalizeOrigin(origin);

      if (allowedOrigins.has(normalizedOrigin) || isVercelOrigin(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${normalizedOrigin}`));
    }
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "portfolio-backend" });
});

app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);

  if (typeof err.message === "string" && err.message.startsWith("CORS blocked for origin:")) {
    return res.status(403).json({ message: err.message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid resource id." });
  }

  return res.status(500).json({ message: "Something went wrong." });
});

const startServer = async () => {
  await connectDB();

  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is already in use. Stop the process using this port, then restart the backend.`
      );
      process.exit(1);
    }

    console.error("Server failed to start:", error.message);
    process.exit(1);
  });
};

startServer();
