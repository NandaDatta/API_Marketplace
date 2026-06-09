const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler')

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