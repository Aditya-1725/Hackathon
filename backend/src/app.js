import express from "express";
import cors from "cors";
import teamRoutes from "./routes/team.routes.js";
import equipmentRoutes from "./routes/equipment.routes.js";
import requestRoutes from "./routes/request.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/teams", teamRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "GearGuard Backend Running" });
});

export default app;
