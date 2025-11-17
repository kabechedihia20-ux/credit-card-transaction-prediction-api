import express from 'express';
import { 
  getUtilisateurs, 
  createUtilisateur, 
  getUtilisateurById, 
  updateUtilisateur, 
  deleteUtilisateur 
} from '../controllers/utilisateur.controller.js';

import {
  validateCreateUtilisateur,
  validateUpdateUtilisateur,
  handleValidationErrors,
} from "../middleware/validateUtilisateur.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const utilisateurRouter = express.Router();

// Routes CRUD pour les utilisateurs
utilisateurRouter.get('/', verifyToken, getUtilisateurs);

utilisateurRouter.post(
  "/",
  validateCreateUtilisateur,
  handleValidationErrors,
  createUtilisateur
);

utilisateurRouter.get('/:id', verifyToken, getUtilisateurById);

utilisateurRouter.put(
  "/:id",
  validateUpdateUtilisateur,
  handleValidationErrors,
  updateUtilisateur
);

utilisateurRouter.delete('/:id', deleteUtilisateur);

export default utilisateurRouter;




/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /utilisateur:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */

/**
 * @swagger
 * /utilisateur/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 */
