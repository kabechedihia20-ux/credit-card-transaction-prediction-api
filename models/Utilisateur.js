// models/Utilisateur.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Utilisateur = sequelize.define(
  "Utilisateur",
  {
    idUtilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_utilisateur", 
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "nom",
      validate: {
        notEmpty: true
      }
    },
    prenom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "prenom",
      validate: {
        notEmpty: true
      }
    },
    adresseEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: "adresse_email",
      validate: {
        notEmpty: true
      }
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "telephone",
    },
    motDePasse: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "mot_de_passe",
      validate: {
        notEmpty: true
      }
    },
    dateCreation: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "date_creation",
    },
  },
  {
    tableName: "utilisateurs", 
    timestamps: false, 
  }
);

export default Utilisateur;
