const {
    redisClient
} = require('../config/redis');

class Cache {
    async get(key) {
        const data = await
            redisClient.get(
                key
            );
        
        return data ? 
            JSON.parse(data)
            : null;
    }

    async set(key, value, ttl=300) {
        await redisClient.set(
            key,
            JSON.stringify(value),
            {
                EX: ttl
            }
        );
    }

    async del(key) {
        await redisClient.del(
            key
        );
    }
}

module.exports = new Cache();