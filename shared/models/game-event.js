const {Model, DataTypes} = require("sequelize")
const {sequelize} = require('../database/sequelize')

class GameEvent extends Model {}
GameEvent.init(
    {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        eventType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'GameEvent',
    }
);

sequelize.sync({force: false}).then(() => {
    console.log("GameEvent table created")
}).catch(() => {
    console.log("Error synchronising GameEvent table")
});


module.exports = GameEvent
