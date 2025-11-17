import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Transaction = sequelize.define("Transaction", {
  idTransaction: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "id_transaction" },
  idUtilisateur: { type: DataTypes.INTEGER, allowNull: false, field: "id_utilisateur" },
  montant: { type: DataTypes.DECIMAL(10,2), allowNull: false, validate: { min: 0 } },
  dateTransaction: { type: DataTypes.DATE, allowNull: false, field: "date_transaction", defaultValue: DataTypes.NOW },
  paysTransaction: { type: DataTypes.STRING(50), allowNull: false, field: "pays_transaction" },
  statut: { type: DataTypes.STRING(30), allowNull: false, field: "statut" } // ex: "valide","suspecte","frauduleuse"
}, {
  tableName: "transaction",
  timestamps: false
});


export default Transaction;