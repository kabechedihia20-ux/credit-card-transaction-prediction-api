import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Analyse = sequelize.define(
  "Analyse",
  {
    idAnalyse: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_analyse",
    },

    idTransaction: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_transaction",
    },

    probabiliteFraude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "probabilite_fraude",
      validate: {
        min: 0,
        max: 100,
      },
    },

    isFraude: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_fraude",
    },

    dateAnalyse: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "date_analyse",
    },
  },
  {
    tableName: "analyse",
    timestamps: false,
  }
);

console.log("Analyse model loaded with max =", Analyse.rawAttributes.probabiliteFraude.validate);
export default Analyse;
