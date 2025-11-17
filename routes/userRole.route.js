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


/**
 * @swagger
 * tags:
 *   name: UserRole
 *   description: Assignation de rôles aux utilisateurs
 */

/**
 * @swagger
 * /user-role:
 *   post:
 *     summary: Assigner un rôle à un utilisateur
 *     tags: [UserRole]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /user-role/{id}:
 *   get:
 *     summary: Obtenir les rôles d’un utilisateur
 *     tags: [UserRole]
 *     security:
 *       - bearerAuth: []
 */
