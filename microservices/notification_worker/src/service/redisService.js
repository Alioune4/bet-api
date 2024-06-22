const redis = require('redis');

const redisSubClient = redis.createClient({
    host: 'localhost',
    port: 6379,
    debug_mode: true
});

redisSubClient.connect().then(() => {
    console.log('Redis Connected!');
}).catch((err) => {
    console.error("Error while connecting to Redis: ", err);
});

module.exports = redisSubClient;