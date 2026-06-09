const Usage = require('../models/usage.model');

class UsageRepository {

    async incrementUsage(userId, endpoint, month) {
        return Usage.findOneAndUpdate(
            {
                userId: userId,
                endpoint: endpoint,
                month: month
            },
            {
                $inc: {
                    requestCount: 1
                }
            },
            {
                upsert: true,
                returnDocument: 'after'
            }
        );
    }

    async getUserUsage(userId) {
        return Usage.find({
            userId
        });
    }

    async getMonthUsage(userId, month) {
        return Usage.find({
            userId,
            month
        });
    }
}

module.exports = new UsageRepository();