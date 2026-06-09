const quotaService = require('../services/quota.service');

const quotaMiddleware = async (req, res, next) => {

    try {
        const result = await
            quotaService.getUsagePercentage(
                req.apiKey.userId
            );
        
        if (result.usage >= result.limit) {
            return res.status(429)
                .json({
                    success: false,
                    message: 'Montly quota exceeded'
                });
        }

        next();

    } catch (error) {
        next(error);
    }
};

module.exports = quotaMiddleware;