const reportQueue = require('../queues/report.queue');

const userRepository = require('../repositories/user.repository');

const usageRepository = require('../repositories/usage.repository');


class ReportService {
    async generateReport(userId) {

        const user = 
            await userRepository.findById(userId);
        
        const usage = 
            await usageRepository.getUserUsage(userId);

        const totalRequests = 
            usage.reduce(
                (sum, item) => 
                    sum + item.requestCount,
                0
            );
        
        
        await reportQueue.add(
            "generate",
            {
                userId,
                email: user.email,
                totalRequests,
            },
            {
                jobId: `report-${userId}-${Date.now()}`,
                attempts: 5,
                backoff: {
                    type: 'exponential',
                    delay: 2000
                }
            }
        );

        return {
            queued: true,
        };
    }
}

module.exports = new ReportService();