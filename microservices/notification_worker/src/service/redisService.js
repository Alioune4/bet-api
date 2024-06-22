const redis = require('redis');

const redisHost =  'redis';
const redisPort =  6379;

const redisSubClient = redis.createClient({
    url: `redis://${redisHost}:${redisPort}`,
    debug_mode: true
});

redisSubClient.connect().then(() => {
    console.log('Redis Connected!');
}).catch((err) => {
    console.error("Error while connecting to Redis: ", err);
});

module.exports = redisSubClient;