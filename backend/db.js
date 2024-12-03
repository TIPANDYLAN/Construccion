const { Sequelize } = require('sequelize');
const { database } = require('./config');

const sequelize = new Sequelize(database.database, database.user, database.password, {
    host: database.host,
    dialect: database.dialect
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

module.exports = { sequelize, connectDB };
