const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("mydb", "root", "password", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

module.exports = sequelize;