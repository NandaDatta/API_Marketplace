const usageRepository = require('../repositories/usage.repository');

class UsageService {

    async trackUsage(userId, endpoint) {
        const month = new Date()
            .toISOString()
            .slice(0, 7);
        
        return usageRepository.incrementUsage(
            userId,
            endpoint,
            month
        );
    }

    async getUsage(userId) {
        return usageRepository.getUserUsage(userId);
    }

    async getCurrentMonthUsage(userId) {
        const moth = new Date()
            .toISOString()
            .slice(0,7)
        
        const usage = await 
            usageRepository.getMonthUsage(userId, month);

        return usage.reduce(
            (sum, item) => 
                sum + item.requestCount,
            0
        );
    }
}

module.exports = new UsageService();