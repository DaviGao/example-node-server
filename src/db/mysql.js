import { configs } from '../config';
import Sequelize from 'sequelize';

const { db } = configs;
const { options, username, password, database } = db;

const sequelize = new Sequelize(database, username, password, options);

export default sequelize;
