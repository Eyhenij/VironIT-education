const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./db.js');

class User extends Model {
}

User.init({

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    login: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = Math.round(Math.random() * 10);
            this.setDataValue('password', bcrypt.hashSync(value, salt));
        }
    },

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    },

}, {sequelize, modelName: 'users'});

// (async () => {
//     await sequelize.sync({force: true});
//     // const john = await User.create({
//     //     name: 'John',
//     //     login: '@john',
//     //     email: 'john@gmail.com',
//     //     password: '$2b$08$poFwyn4agwpfqgkyANympOmzdbF2eHnJPlJM4kRWQMiAt7.4Kyp/e',
//     //     salt: 8,
//     //     role: 'user'
//     // });
//     // console.log(john.toJSON());
// })();

module.exports = User;