import express from "express";
import {
  assignRole,
  getUserRoles,
  removeRole
} from "../controllers/userRole.controller.js";

import { validateAssignRole, handleValidationErrors } from "../middleware/validateRole.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const userRoleRouter = express.Router();

// Assigner un rôle
userRoleRouter.post("/", verifyToken, validateAssignRole, handleValidationErrors, assignRole);

// Voir les rôles d’un user
userRoleRouter.get("/:id", verifyToken, getUserRoles);

// Enlever un rôle
userRoleRouter.delete("/", verifyToken, removeRole);

export default userRoleRouter;
