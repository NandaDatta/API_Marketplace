const usageService = require('../services/usage.service');
const asyncHandler = require('../utils/asyncHandler');

class UsageController {
    getUsage = asyncHandler(async (req, res) => {
        const data = await
            usageService.getUsage(req.user.userId);
        
        res.json({
            success: true,
            data
        });
    })
};

module.exports = new UsageController();