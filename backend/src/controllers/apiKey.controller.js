const apiKeyService = require('../services/apiKey.service');
const asyncHandler = require('../utils/asyncHandler');

class ApiKeyController {

    createKey = asyncHandler(async (req, res) => {
        const apiKey = await
            apiKeyService.createKey(
                req.user.userId,
                req.body.name
            );
        
        res.status(201).json({
            success: true,
            apiKey
        });
    });

    getkeys = asyncHandler(async (req, res) => {
        const keys = await
            apiKeyService.getkeys(
                req.user.userId
            );
        
        res.json({
            success: true,
            keys
        });
    });

    activeKey = asyncHandler(async (req, res) => {
        const key = await
            apiKeyService.activeKey(req.params.id);
        
        res.json({
            success: true,
            key
        });
    });

    revokeKey = asyncHandler(async (req, res) => {
        const key = await
            apiKeyService.revokeKey(
                req.params.id
            );
        
        res.json({
            success: true,
            key
        });
    });
}

module.exports = new ApiKeyController();