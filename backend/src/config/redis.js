const { createClient } = require('redis');

const redisHost = process.env.REDIS_HOST || 'redis';
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = createClient({
    url: `redis://${redisHost}:${redisPort}`
});

redisClient.on(
    "error",
    (err) => {
        console.error(
            'Redis Error: ',
            err
        );
    }
);

const connectRedis = async () => {
    await redisClient.connect();
    console.log('Redis connected');
};

module.exports = {
    redisClient, connectRedis
};