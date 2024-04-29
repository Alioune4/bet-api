const express = require('express');
const redis = require('redis');


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


app.get('/', (req, res) => {
    res.send('Hello World!');
    redisClient.set("keykey", "vavalue")
});

app.post('/publish', async (req, res) => {
    try {
        const {key, value} = req.body;
        const gameState = JSON.stringify(value)
        await redisClient.set(key, gameState);

        //TODO: insert to db
        res.status(200).json({message: "Message Published Successfully!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error while sending message :"})
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});