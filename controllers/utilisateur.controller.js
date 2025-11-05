import Utilisateur from "../models/Utilisateur.js";

// Get all utilisateur
export const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll();
    res.json(utilisateurs);
    res.render('utilisateurs', { utilisateurs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create Utilisateur
export const createUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.create(req.body);
    res.status(201).json(utilisateur);
    res.redirect('/utilisateur');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(utilisateur);
    res.render('utilisateurDetail', { utilisateur });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUtilisateur = async (req, res) => {
  try {
    const [updated] = await Utilisateur.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    res.json(utilisateur);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUtilisateur = async (req, res) => {
  try {
    const deleted = await Utilisateur.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};