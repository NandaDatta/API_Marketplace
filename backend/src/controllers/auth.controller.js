const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');
const auditService = require('../services/audit.service');

class AuthController {

    register = asyncHandler(async (req, res) => {
        const result = await 
            authService.register(req.body);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            result
        });
    });

    login = asyncHandler(async(req, res) => {

        const result = await
            authService.login(
                req.body.email,
                req.body.password
            );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            result
        });

        await auditService.logs(
            result.user._id,
            'LOGIN'
        )
    });

    profile = asyncHandler(async (req, res) => {
        const user = await
            authService.getProfile(
                req.user.userId
            );
        res.json(user);
    });
}

module.exports = new AuthController();