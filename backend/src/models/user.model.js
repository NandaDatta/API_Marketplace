const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        plan: {
            type: String,
            default: 'free',
        },

        monthlyLimit: {
            type: Number,
            default: 100
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }

    }, { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);