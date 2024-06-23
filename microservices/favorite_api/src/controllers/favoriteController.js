const Favorite = require('../../../shared/models/favorite');


const addFavorite = async (req, res) => {
    try {
        const { userId, matchId } = req.body;
        const newFavorite = await Favorite.create({ userId, matchId });
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const removeFavorite = async (req, res) => {
    try {
        const { userId, matchId } = req.body;
        const favoriteToDelete = await Favorite.findOne({ where: { userId, matchId } });
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
