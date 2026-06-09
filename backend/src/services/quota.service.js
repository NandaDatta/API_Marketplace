const User = require('../models/user.model');
const Usage = require('../models/usage.model');

class QuotaService {

    async getUsagePercentage(userId) {
        const user = await
            User.findById(userId);

        const month = new Date()
            .toISOString()
            .slice(0,7);

        const usages = await
            Usage.find({
                userId,
                month
            });

        const totalUsage = usages
            .reduce(
                (sum, item) => 
                    sum + item.requestCount,
                0
            );

        return {
            usage: totalUsage,
            limit: 
                user.monthlyLimit,
            percentage:
                Math.floor(
                    (totalUsage / 
                        user.monthlyLimit
                    ) * 100
                )
        };       
    }
}

module.exports = new QuotaService();