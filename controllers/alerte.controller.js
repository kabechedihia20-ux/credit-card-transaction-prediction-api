import Alerte from "../models/Alerte.js";

export const getAlertes = async (req, res) => {
  try {
    const alertes = await Alerte.findAll();
    res.status(200).json(alertes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
