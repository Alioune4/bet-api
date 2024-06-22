const Game = require('../models/game')
const GameEvent = require('../models/game-event')
const redisPubClient = require('../service/redisService');
const {computeDescription} = require('../service/gameService');


const states = ["PRE-MATCH", "DRAFT", "LIVE", "ENDED"]//TODO

const createGame = async (req, res) => {
    try {
        const { title, competitor1, competitor2, startDate, endDate } = req.body;
        const game = { title, competitor1, competitor2, startDate, endDate }

        const createdGame = await Game.create(game);

        res.status(200).json({message: "Game Published Successfully!", game: createdGame})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error while creating the game :"})
    }

};


const updateGameStatus =async(req,res)=>{
    try {
        const gameId = req.params.id;
        const game = await Game.findByPk(gameId);

        if (!game){
            return res.status(404).json({message: "Game not found", gameId: gameId});
        }
        const stateIndex = states.findIndex(s => s === game.status);

        if (stateIndex === states.length - 1){
            return res.status(400).json({message: "Game already ended", gameId: gameId});
        }

        game.status = states[stateIndex + 1];


        // Create a new GameEvent
        const eventType = 'status_change';
        const eventDescription = computeDescription(game.status);
        await GameEvent.create({
            gameId: game.id,
            date: new Date(),
            eventType: eventType,
            description: eventDescription
        });

        await game.save();
        await redisPubClient.publish("game_events", JSON.stringify({gameId: `:${game.id}`, date: new Date(), eventType: eventType, description: eventDescription }));
        res.status(200).json({message: "Game Updated Successfully!", game: game})

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error while updating the game :"})
    }
}

const updateGameScore = async(req,res)=>{
    try {
        const gameId = req.params.id;
        //const killer = req.query.killer;
        const game = await Game.findByPk(gameId);

        if (!game){
            return res.status(404).json({message: "Game not found", gameId: gameId});
        }

        if (game.status !== "LIVE"){
            return res.status(400).json({message: "Game is not on live", game: game});
        }

        let killerTeam = "away";

        if (req.query.killerTeam === "away"){
            game.awayScore++;
        }
        else {
            killerTeam = "home"
            game.homeScore++;
        }

        await game.save();
        await redisPubClient.publish("game_events", JSON.stringify({games:`${game.id}`, timestamp: new Date(), type: 'kill', killer: killerTeam }));

        res.status(200).json({message: "Game Updated Successfully!", game: game})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error while updating the game :"})
    }
}

module.exports = {createGame, updateGameStatus,updateGameScore};
