import Role from "../models/Role.js";

// GET all roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET : role by id
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: "Role non trouvé" });
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createRole = async (req, res) => {
  try {
    console.log("Body reçu :", req.body);
    const role = await Role.create(req.body);
    console.log("Role créé :", role);
    res.status(201).json(role);
  } catch (err) {
    console.error("Erreur createRole :", err);
    res.status(400).json({ error: err.message });
  }
};
// PUT : update role
export const updateRole = async (req, res) => {
  try {
    const [updated] = await Role.update(req.body, {
      where: { idRole: req.params.id }
    });
    if (!updated) return res.status(404).json({ message: "Role non trouvé" });
    const role = await Role.findByPk(req.params.id);
    res.status(200).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE : delete role
export const deleteRole = async (req, res) => {
  try {
    const deleted = await Role.destroy({ where: { idRole: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Role non trouvé" });
    res.status(200).json({ message: "Role supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
