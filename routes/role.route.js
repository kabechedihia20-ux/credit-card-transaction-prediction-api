import express from "express";
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} from "../controllers/role.controller.js";

import { validateCreateRole, handleValidationErrors } from "../middleware/validateRole.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const roleRouter = express.Router();

roleRouter.get("/", verifyToken, getRoles);
roleRouter.get("/:id", verifyToken, getRoleById);

roleRouter.post("/", verifyToken, validateCreateRole, handleValidationErrors, createRole);

roleRouter.put("/:id", verifyToken, updateRole);
roleRouter.delete("/:id", verifyToken, deleteRole);

export default roleRouter;



/**
 * @swagger
 * tags:
 *   name: Rôles
 *   description: Gestion des rôles
 */

/**
 * @swagger
 * /role:
 *   post:
 *     summary: Créer un rôle
 *     tags: [Rôles]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /role:
 *   get:
 *     summary: Liste des rôles
 *     tags: [Rôles]
 *     security:
 *       - bearerAuth: []
 */
