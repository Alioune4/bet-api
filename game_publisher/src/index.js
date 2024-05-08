const express = require('express');
const redis = require('redis');
const {User, Game} = require('./models')


const app = express();
const port = 3000;
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
    debug_mode: true});

(async () => {
    await redisClient.connect();
})()



redisClient.on('error', err => {
    console.error('Redis Client Error', err);
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

app.use(express.json());



app.post('/games', async (req, res) => {
    try {

        const { title, competitor1, competitor2, startDate, endDate, status } = req.body;
        const game = { title, competitor1, competitor2, startDate, endDate, status }

        const createdGame = await Game.create(game);
        const gameIdAsString = String(createdGame.id);

        await redisClient.set(gameIdAsString,  JSON.stringify(createdGame));

        res.status(200).json({message: "Game Published Successfully!", game: createdGame})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error while publishing the game :"})
    }

})

app.put('/games/:id', async  (req, res) => {
    try {
        const gameId = req.params.id;

        const { title, competitor1, competitor2, startDate, endDate, homeScore, awayScore, status } = req.body;

        const game = await Game.findByPk(gameId);

        if (!game){
            return res.status(404).json({message: "Game not found", gameId: gameId});
        }

        await game.update({ title, competitor1, competitor2, startDate, endDate, homeScore, awayScore, status })
        await redisClient.set(game.id, JSON.stringify(game));

        res.status(200).json({message: "Game Updated Successfully!", game: game})

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error while updating the game :"})
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});