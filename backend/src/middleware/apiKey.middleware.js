const apiKeyService = require('../services/apiKey.service');

const apiKeyMiddleware = async (req, res, next) => {

    try {
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                message: "API key missing"
            });
        }

        const key = await
            apiKeyService.validateKey(apiKey);

        if (!key) {
            return res.status(401).json({
                message: 'Invalid API key'
            });
        }

        req.apiKey = key;
        
        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = apiKeyMiddleware;