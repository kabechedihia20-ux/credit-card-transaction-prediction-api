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




/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adresseEmail: { type: string }
 *               motDePasse: { type: string }
 *     responses:
 *       200:
 *         description: Token généré
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Inscription utilisateur
 *     tags: [Auth]
 */
