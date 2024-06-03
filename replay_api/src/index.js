const express = require('express');
const {Game, GameEvent} = require('../../game_publisher/src/models')


const app = express();
const port = 3002;
app.use(express.json)

app.get('/replay/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const game = await Game.findByPk(gameId);

        if (!game){
            return res.status(404).json({message: "Game not found", gameId: gameId});
        }

        /*res = []

        const events = await GameEvent.findAll({
            where:
        })*/

        /*for (gameEvent of game.gameEvents)
        {
            console.log(game)
        }*/


        res.status(200).json({games: game});
    } catch (error){
        res.status(500).json({message: "Error retrieving open games"})
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})