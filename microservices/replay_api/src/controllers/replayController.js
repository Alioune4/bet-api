const Game = require('../models/game')
const GameEvent = require('../models/game-event')

const replayGame =  async (req, res) => {
    console.log("Replaying game")
    try {
        const gameId = req.params.id;
        const game = await Game.findByPk(gameId);

        if (!game){
            return res.status(404).json({message: "Game not found", gameId: gameId});
        }

        const gameEvents = await GameEvent.findAll({
            where: {gameId: gameId},
            order: [['date', 'ASC']]
        });

        res.status(200).json({game: game, gameEvents: gameEvents});

    } catch (error){
        res.status(500).json({message: "Error retrieving the game and its events :"})
    }

}

module.exports = {replayGame};
