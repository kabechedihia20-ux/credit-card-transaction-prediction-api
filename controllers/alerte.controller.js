import Alerte from "../models/Alerte.js";

export const getAlertes = async (req, res) => {
  try {
    const alertes = await Alerte.findAll();
    res.status(200).json(alertes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAlerteById = async (req, res) => {
  try {
    const alerte = await Alerte.findByPk(req.params.id);

    if (!alerte) {
      return res.status(404).json({ error: "Alerte non trouvée" });
    }

    res.status(200).json(alerte);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

