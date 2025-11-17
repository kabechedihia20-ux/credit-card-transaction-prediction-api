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
