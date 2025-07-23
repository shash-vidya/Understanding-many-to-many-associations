const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('associationdb', 'root', 'YourPasswordHere', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
