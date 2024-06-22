const redis = require('redis');

const redisPubClient = redis.createClient({
    host: 'localhost',
    port: 6379,
    debug_mode: true
});

redisPubClient.connect().then(() => {
    console.log('Redis Connected!');
}).catch((err) => {
    console.error("Error while connecting to Redis: ", err);
});

module.exports = redisPubClient;