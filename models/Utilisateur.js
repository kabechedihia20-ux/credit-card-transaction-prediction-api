import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Utilisateur = sequelize.define('Utilisateur', {
  idUtilisateur: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING, allowNull: false },
  prenom: { type: DataTypes.STRING, allowNull: false },
  adresseEmail: { type: DataTypes.STRING, allowNull: false, unique: true },
  telephone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      len: [10, 20], 
    }
  },
  motDePasse: { type: DataTypes.STRING, allowNull: false },
  dateCreation: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'utilisateurs',
  timestamps: true
});

export default Utilisateur;