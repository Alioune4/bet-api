const Game = require('../models/game')
const GameEvent = require('../models/game-event')
const redisPubClient = require('../service/redisService');


const states = ["PRE-MATCH", "DRAFT", "LIVE", "ENDED"]//TODO


const createAndPublishEvent = async (gameEvent) => {
    await GameEvent.create(gameEvent);
    await redisPubClient.publish("game_events", JSON.stringify(gameEvent));
};

const createGame = async (req, res) => {
    try {
        const {title, competitor1, competitor2, startDate, endDate} = req.body;
        const game = {title, competitor1, competitor2, startDate, endDate}

        const createdGame = await Game.create(game);

        res.status(201).json({message: "Game created Successfully!", createdGame: createdGame})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error while creating the game :"})
    }

};


const updateGameStatus = async (req, res) => {
    try {
        const gameId = req.params.id;
        const game = await Game.findByPk(gameId);

        if (!game) {
            return res.status(404).json({message: "Game not found", gameId: gameId});
        }
        const stateIndex = states.findIndex(s => s === game.status);

        if (stateIndex === states.length - 1) {
            return res.status(400).json({message: "Game already ended", gameId: gameId});
        }

        game.status = states[stateIndex + 1];

        const metadata = JSON.stringify({newStatus: game.status});

        const gameEvent = {
            gameId: game.id,
            date: new Date(),
            eventType: 'status_change',
            metadata: metadata
        };


        await game.save();

        await createAndPublishEvent(gameEvent);
        res.status(200).json({message: "Game Updated Successfully!", gameEvent: gameEvent})

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error while updating the game :"})
    }
}

const updateGameScore = async (req, res) => {
    try {
        const gameId = req.params.id;
        const game = await Game.findByPk(gameId);

        if (!game) {
            return res.status(404).json({message: "Game not found", gameId: gameId});
        }

        if (game.status !== "LIVE") {
            return res.status(400).json({message: "Game is not on live", game: game});
        }

        const killerSide = req.query.killerSide || "home";
        killerSide === "home" ? game.score1 += 1 : game.score2 += 1;
        const killerTeam = ("home" === killerSide) ? game.competitor1 : game.competitor2;

        const killer = req.query.killer || "unknown";
        const killStreak = req.query.killStreak ? parseInt(req.query.killStreak) : 1;

        const gameEvent = {
            gameId: game.id,
            date: new Date(),
            eventType: 'kill',
            metadata: JSON.stringify({killerTeam: killerTeam, killer: killer, killStreak: killStreak})
        }

        await game.save();

        await createAndPublishEvent(gameEvent);
        res.status(200).json({message: "Game Updated Successfully!", gameEvent: gameEvent})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error while updating the game :"})
    }
}

module.exports = {createGame, updateGameStatus, updateGameScore};
