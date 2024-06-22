const {Model, DataTypes} = require("sequelize")
const sequelize = require('../database/sequelize')

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

sequelize.sync({force: false}).then(() => {
    console.log("Game class synchronized")
}).catch(() => {
    console.log("Error synchronising Game class")
})
module.exports = User
