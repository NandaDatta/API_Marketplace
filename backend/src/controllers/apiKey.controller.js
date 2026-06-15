const apiKeyService = require('../services/apiKey.service');
const auditService = require('../services/audit.service');
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

        await auditService.logs(
            req.user.userId,
            'CREATE_API_KEY'
        );
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

        await auditService.logs(
            req.user.userId,
            'UPDATE_ACTIVE_API_KEY'
        );
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

        await auditService.logs(
            req.user.userId,
            'UPDATE_REVOKE_API_KEY'
        );
    });
}

module.exports = new ApiKeyController();