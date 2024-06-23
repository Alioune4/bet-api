const {Model, DataTypes} = require("sequelize")
const sequelize = require('../database/sequelize')

class Favorite extends Model {}

Favorite.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Games',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'GameFavorite'
});


sequelize.sync({ force: false }).then(() => {
    console.log('Favorites table created');
})


module.exports = Favorite;
