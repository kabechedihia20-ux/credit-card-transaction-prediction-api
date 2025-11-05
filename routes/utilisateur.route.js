import express from 'express';
import { 
  getUtilisateurs, 
  createUtilisateur, 
  getUtilisateurById, 
  updateUtilisateur, 
  deleteUtilisateur 
} from '../controllers/utilisateur.controller.js';

const utilisateurRouter = express.Router();

// Routes CRUD pour les utilisateurs
utilisateurRouter.get('/', getUtilisateurs);
utilisateurRouter.post('/', createUtilisateur);
utilisateurRouter.get('/:id', getUtilisateurById);
utilisateurRouter.put('/:id', updateUtilisateur);
utilisateurRouter.delete('/:id', deleteUtilisateur);

export default utilisateurRouter;
