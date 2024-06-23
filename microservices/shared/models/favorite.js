const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize')

class Favorite extends Model {}

Favorite.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    matchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Matches',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Favorite'
});

sequelize.sync({ force: false }).then(() => {
    console.log('Favorites table created');
})


module.exports = Favorite;
