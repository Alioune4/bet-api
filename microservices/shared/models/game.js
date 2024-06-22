const {Model, DataTypes} = require("sequelize")
const sequelize = require('../database/sequelize')

class Game extends Model {
}

Game.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        competitor1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        competitor2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        homeScore: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        awayScore: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.ENUM('PRE-MATCH', 'DRAFT', 'LIVE', 'ENDED'),
            defaultValue: 'PRE-MATCH',
        },
    },
    {
        sequelize,
        modelName: 'Game',
    }
);

sequelize.sync({force: false}).then(() => {
    console.log("Game table created")
}).catch(() => {
    console.log("Error synchronising Game table")
});

module.exports = Game
