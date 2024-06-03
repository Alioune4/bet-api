const {Sequelize, DataTypes} = require("sequelize")

const sequelize = new Sequelize('postgres://user:postgresPass@localhost:5432/postgres')

try {
    sequelize.authenticate();
    console.log('Connection to postgres has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the postgres database:', error);
}

const User = sequelize.define(
    'User',
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
        // Other model options go here
    },
);

const Game = sequelize.define(
    'Game',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
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
            defaultValue: 0
        },
        awayScore: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM("PRE-MATCH", "DRAFT", "LIVE", "ENDED"),
            defaultValue: "PRE-MATCH"
        },
    },
    {
        // Other model options go here
    },
);

const GameEvent = sequelize.define(
    'GameEvent',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
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
        }
    },
    {
        // Other model options go here
    },
);

Game.hasMany(GameEvent);
GameEvent.belongsTo(Game);

( async () => {await sequelize.sync()})();
console.log('All models were synchronized successfully.');

module.exports = {
    Game,
    User,
    GameEvent
}