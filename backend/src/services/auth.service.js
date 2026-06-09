const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository');
const { generateToken } = require('../utils/jwt');

class AuthService {

    /*
        Register User
    */

    async register(data) {
        const existingUser = await 
            userRepository.findByEmail(data.email);
        
        if (existingUser) {
            throw new Error(
                'User already exists'
            );
        }

        const hashedPassword = await bcrypt.hash(
            data.password,
            10
        );

        const user = await
            userRepository.createUser({
                ...data,
                password: hashedPassword
        });

        user.password = undefined;

        return {
            user,
            token: generateToken(user._id)
        };
    }

    /*
        Login User
    */
    async login(email, password) {
        const user = await 
            userRepository.findByEmail(email);
        
        if (!user) {
            throw new Error(
                'Invalid credentials'
            );
        }

        const isMatch = await 
            bcrypt.compare(
                password,
                user.password
            );
        
        if (!isMatch) {
            throw new Error(
                'Invalid credentials'
            );
        }

        user.password = undefined;

        return {
            user,
            token: generateToken(user._id)
        }
    }

    /*
        User Profile
    */
    async getProfile (userId) {
        const user = await
            userRepository.findById(userId);
        
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }
}

module.exports = new AuthService();