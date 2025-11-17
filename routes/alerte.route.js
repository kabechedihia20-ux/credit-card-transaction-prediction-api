import express from "express";
import { getAlertes } from "../controllers/alerte.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const alerteRouter = express.Router();

alerteRouter.get("/", verifyToken, getAlertes);

export default alerteRouter;
