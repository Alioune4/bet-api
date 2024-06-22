const {Model, DataTypes} = require("sequelize")
const sequelize = require('../database/sequelize')
const Game = require('./Game');

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
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'GameEvent',
    }
);

// Define the association
Game.hasMany(GameEvent, {
    foreignKey: 'gameId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
GameEvent.belongsTo(Game, {
    foreignKey: 'gameId',
});

sequelize.sync({force: false}).then(() => {
    console.log("GameEvent table created")
}).catch(() => {
    console.log("Error synchronising GameEvent table")
});


module.exports = GameEvent
