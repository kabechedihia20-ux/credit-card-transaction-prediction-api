import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Alerte = sequelize.define("Alerte", {
  idAlerte: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "id_alerte" },
  idAnalyse: { type: DataTypes.INTEGER, allowNull: false, field: "id_analyse" },
  message: { type: DataTypes.STRING(255), allowNull: false, field: "message" },
  niveau: { type: DataTypes.STRING(20), allowNull: false, field: "niveau" }, // ex: "BAS", "MOYEN", "HAUT"
  dateCreation: { type: DataTypes.DATE, allowNull: false, field: "date_creation", defaultValue: DataTypes.NOW }
}, {
  tableName: "alerte",
  timestamps: false
});

export default Alerte;