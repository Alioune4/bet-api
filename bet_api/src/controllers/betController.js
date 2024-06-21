const Game = require('../../../shared/models/game')
const { Op } = require('sequelize');


const getOpenGames = async (req, res) => {
    try {
        const games = await Game.findAll({
            where: {
                status: {
                    [Op.not]: "ENDED"
                }
            }
        });
        res.json(games);
    }
    catch (error) {
        res.status(500).json({message: "Error retrieving open games :"+error.message})
    }
}



module.exports = {getOpenGames}
