import express from "express";
import { getAnalyses, getAnalyseById } from "../controllers/analyse.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const analyseRouter = express.Router();

analyseRouter.get("/", verifyToken, getAnalyses);
analyseRouter.get("/:id", verifyToken, getAnalyseById);

export default analyseRouter;




/**
 * @swagger
 * tags:
 *   name: Analyses
 *   description: Résultats d'analyse des fraudes
 */

/**
 * @swagger
 * /analyse:
 *   get:
 *     summary: Récupérer toutes les analyses
 *     tags: [Analyses]
 *     security:
 *       - bearerAuth: []
 */
