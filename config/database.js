import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('cct_admin', 'cct_admin', 'cct_prediction_api', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

export default sequelize;