const Favorite = require('../models/favorite');


const addFavorite = async (req, res) => {
    try {
        const { userId, gameId } = req.body;
        const newFavorite = await Favorite.create({ userId, gameId });
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const removeFavorite = async (req, res) => {
    try {
        const { userId, gameId } = req.body;
        const favoriteToDelete = await Favorite.findOne({ where: { userId, gameId } });
        if (favoriteToDelete) {
            await favoriteToDelete.destroy();
            res.status(200).send('Favorite removed');
        } else {
            res.status(404).send('Favorite not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {addFavorite, removeFavorite};
