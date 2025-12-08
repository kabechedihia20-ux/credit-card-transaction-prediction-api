import express from "express";
import { getAlertes, getAlerteById } from "../controllers/alerte.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const alerteRouter = express.Router();

alerteRouter.get("/", verifyToken, getAlertes);
alerteRouter.get("/:id", verifyToken, getAlerteById);

export default alerteRouter;




/**
 * @swagger
 * tags:
 *   name: Alertes
 *   description: Alertes générées par le système
 */

/**
 * @swagger
 * /alerte:
 *   get:
 *     summary: Récupérer toutes les alertes
 *     tags: [Alertes]
 *     security:
 *       - bearerAuth: []
 */
