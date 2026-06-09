const User = require('../models/user.model');

class UserRepository {
    async createUser(userData) {
        return await User.create(userData);
    }

    async findByEmail(email) {
        return await User.findOne({ email })
            .select('+password');
    }

    async findById(id) {
        return await User.findById(id);
    }
}

module.exports = new UserRepository();