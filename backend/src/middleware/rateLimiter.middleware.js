const { redisClient } = require('../config/redis');

const rateLimiter = (limit=5, windowSeconds=60) => async(req, res, next) => {
    try {
        const ip = req.ip;

        const key = `rate:${ip}`;

        const now = Date.now();

        const windowStart = now - windowSeconds * 1000;

        await redisClient.zRemRangeByScore(key, 0, windowStart);

        await redisClient.zAdd(
            key,
            [
                {
                    score: now,
                    value:
                        now.toString()
                }
            ]
        );

        const count = await redisClient.zCard(key);

        await redisClient.expire(key, windowSeconds);

        if (count > limit) {
            return res.status(429).json({
                success: false,
                message: 'Too many requests'
            });
        }

        next();

    } catch (error) {
        next(error);
    }
}

module.exports = rateLimiter;