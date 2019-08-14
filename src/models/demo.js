import Sequelize from 'sequelize';
import sequelize from '../db/mysql';
import { isProduction } from '../config';

const Demos = sequelize.define(
  'demos',
  {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    extra: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  },
  {
    underscored: true,
    comment: 'demo',
    freezeTableName: true,
  },
);

if (!isProduction) {
  Demos.sync();
}

export default Demos;
