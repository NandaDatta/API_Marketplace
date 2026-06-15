const User = require('../models/user.model');
const ApiKey = require('../models/apiKey.model');
const Usage = require('../models/usage.model');

class AdminService {

    async getDashboardStats() {
        const totalUsers = await
            User.countDocuments();

        const totalApiKeys = await
            ApiKey.countDocuments();
        
        const usages = await
            Usage.find();

        const totalRequests = 
            usages.reduce(
                (sum, usage) => 
                    sum + usage.requestCount,
                0
            );

        return {
            totalUsers,
            totalApiKeys,
            totalRequests
        };
    }
}
module.exports = new AdminService();