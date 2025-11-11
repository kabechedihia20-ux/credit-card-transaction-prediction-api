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

const utilisateurRouter = express.Router();

// Routes CRUD pour les utilisateurs
utilisateurRouter.get('/', getUtilisateurs);

utilisateurRouter.post(
  "/",
  validateCreateUtilisateur,
  handleValidationErrors,
  createUtilisateur
);

utilisateurRouter.get('/:id', getUtilisateurById);

utilisateurRouter.put(
  "/:id",
  validateUpdateUtilisateur,
  handleValidationErrors,
  updateUtilisateur
);

utilisateurRouter.delete('/:id', deleteUtilisateur);

export default utilisateurRouter;
