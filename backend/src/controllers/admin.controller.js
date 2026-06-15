const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');

const adminService = require('../services/admin.service');

const AuditLog = require('../models/aduitLog.model'); 
const ApiKey = require('../models/apiKey.model');

class AdminController {
    getUsers = asyncHandler(async (req, res) => {
        const users = await User.find({
            _id: { $ne: req.user.userId }
        });
        res.status(200).json({
            success: true,
            data: users
        });
    });

    getDashboard = asyncHandler(async (req, res) => {
        const stats = await
            adminService.getDashboardStats();

        res.status(200).json({
            success: true,
            data: stats
        });
    });

    getActivity = asyncHandler(async (req, res) => {
        const activity = await
            AuditLog.find()
                .populate(
                    'userId',
                    'email role'
                )
                .sort({
                    createdAt: -1
                })
                .limit(50)
        res.status(200).json({
            success: true,
            data: activity
        });
    });

    getApiKeys = asyncHandler(async (req, res) => {
        const keys = await
            ApiKey.find()
            .populate(
                'userId',
                'email'
            );

        res.status(200).json({
            success: true,
            data: keys
        })
    });

    revokeApi = asyncHandler(async (req, res) => {
        const key = await 
            ApiKey.findByIdAndUpdate(
                req.params.id,
                {
                    status: 'revoked',
                },
                {
                    new: true,
                }
            );
        
        res.status(200).json(key);
        
        await AuditLog.create(
            req.user.userId,
            'UPDATED_REVOKE_API_KEY'
        );

    });

    enableApi = asyncHandler(async (req, res) => {
        const key = await
            ApiKey.findByIdAndUpdate(
                req.params.id,
                {
                    status: 'active'
                },
                {
                    new: true,
                }
            );
        
        res.status(200).json(key);

        await AuditLog.create(
            req.user.userId,
            'UPDATED_ACTIVE_API_KEY'
        );
    });

    getActiveApiKeys = asyncHandler(async (req, res) => {
        const key = await
            ApiKey.findById(req.params.id);

        if (!key) {
            return res.status(404).json({
                success: false,
                message: 'Key is not found'
            });
        }

        if (key.status === 'active') {
            return res.status(200).json({
                success: true,
                key
            });
        }

        return res.status(200).json({
            message: 'No active keys'
        });
    });
}

module.exports = new AdminController();