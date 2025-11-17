import UserRole from "../models/UserRole.js";
import Utilisateur from "../models/Utilisateur.js";
import Role from "../models/Role.js";

// Assigner un rôle à un utilisateur
export const assignRole = async (req, res) => {
  try {
    const { idUtilisateur, idRole } = req.body;

    // Vérifier si user existe
    const user = await Utilisateur.findByPk(idUtilisateur);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    // Vérifier si role existe
    const role = await Role.findByPk(idRole);
    if (!role) return res.status(404).json({ message: "Role introuvable" });

    // Créer l'association
    const link = await UserRole.create({ idUtilisateur, idRole });

    res.status(201).json({
      message: "Rôle assigné avec succès",
      data: link
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lire les rôles d’un utilisateur
export const getUserRoles = async (req, res) => {
  try {
    const idUtilisateur = req.params.id;

    const user = await Utilisateur.findByPk(idUtilisateur, {
      include: [Role]
    });

    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un rôle d’un utilisateur
export const removeRole = async (req, res) => {
  try {
    const { idUtilisateur, idRole } = req.body;

    const deleted = await UserRole.destroy({
      where: { idUtilisateur, idRole }
    });

    if (!deleted)
      return res.status(404).json({ message: "Association non trouvée" });

    res.status(200).json({ message: "Rôle retiré de l'utilisateur" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
