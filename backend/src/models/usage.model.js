const mongoose = require('mongoose');

const usageSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        endpoint: {
            type: String,
            required: true,
        },

        month: {
            type: String,
            required: true,
        },

        requestCount: {
            type: Number,
            default: 0
        },
    }, { timestamps: true },
);

module.exports = mongoose.model(
    'Usage',
    usageSchema
);
