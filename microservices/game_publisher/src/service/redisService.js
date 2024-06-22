const redis = require('redis');


const redisHost =  'redis';
const redisPort =  6379;

const redisPubClient = redis.createClient({
    url: `redis://${redisHost}:${redisPort}`,
    debug_mode: true
});

redisPubClient.connect().then(() => {
    console.log('Redis Connected!');
}).catch((err) => {
    console.error("Error while connecting to Redis: ", err);
});

module.exports = redisPubClient;