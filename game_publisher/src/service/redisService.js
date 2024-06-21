const redis = require('redis');

const Game = require('../../../shared/models/game')


const connect = async () => {
    const redisClient = redis.createClient({
        host: 'localhost',
        port: 6379,
        debug_mode: true
    });

    await redisClient.connect();
    return redisClient;
}

const redisSubClient = await connect();
const redisPubClient = await connect();

redisPubClient.on('error', (err) => {
    console.error(err);
});

redisSubClient.on('error', (err) => {
    console.error(err);
});
