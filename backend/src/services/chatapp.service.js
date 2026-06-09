const {
    redisClient
} = require('../config/redis');

class ChatAppService {
    async getChat(roomId) {
        const cachekey = `chatroom:${roomId}`;

        const cached = await
            redisClient.get(cachekey);
        
        if (cached) {
            console.log('CACHE HIT');

            return JSON.parse(cached);
        }

        console.log('CACHE MISS');

        const chatData = {
            roomId,
            fetchedAt: new Date(),
        };

        await redisClient.set(cachekey,
            JSON.stringify(
                chatData
            ),
            {
                EX: 300
            }
        );

        return chatData;
    }
}

module.exports = new ChatAppService();