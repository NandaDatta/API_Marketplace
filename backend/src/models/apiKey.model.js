const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        keyHash: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ['active', 'revoke'],
            default: 'active',
        },

        expiresAt: {
            type: Date,
            default: null,
        }

    }, { timestamps: true }
);

module.exports = mongoose.model('ApiKey', apiKeySchema);