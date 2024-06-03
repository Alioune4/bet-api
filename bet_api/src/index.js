const express = require('express');
const {Game} = require('../../game_publisher/src/models')


const app = express();
const port = 3001;
app.use(express.json)

app.get('/replay/', async (req, res) => {
    try {
        const games = await Game.findAll({
            where: {
                status: {
                    [Op.not]: "ENDED"
                }
            }
        });
        res.status(200).json({games: games});
    } catch (error){
        res.status(500).json({message: "Error retrieving open games"})
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})