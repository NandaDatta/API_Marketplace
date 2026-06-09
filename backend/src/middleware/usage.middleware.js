const usageService = require('../services/usage.service');

const usageMiddleware = async (req, res, next) => {
    try {
        if (req.apiKey && req.apiKey.userId) {
            await usageService.trackUsage(
                req.apiKey.userId,
                req.baseUrl
            );
            
        } 
        next();
    } catch (error) {
        console.error(error);
        next();
    }
}

module.exports = usageMiddleware;