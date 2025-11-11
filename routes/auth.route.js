// routes/auth.route.js
import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import {
  validateCreateUtilisateur,
  handleValidationErrors,
} from "../middleware/validateUtilisateur.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateCreateUtilisateur,
  handleValidationErrors,
  signup
);

authRouter.post("/login", login);

export default authRouter;
