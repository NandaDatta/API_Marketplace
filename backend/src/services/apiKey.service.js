const crypto = require('crypto');

const apiKeyRepository = require('../repositories/apiKey.repository');

const {
    generateApiKey
} = require('../utils/apiKey');

class ApiKeyService {
    async createKey(userId, name) {
        const rawkey = generateApiKey();

        const hash = crypto
            .createHash('sha256')
            .update(rawkey)
            .digest('hex');

        await apiKeyRepository.create({
            userId,
            name,
            keyHash: hash
        });

        return rawkey;
    }

    async getkeys(userId) {
        return apiKeyRepository.findByUser(userId);
    }

    async revokeKey(id) {
        return apiKeyRepository.revoke(id);
    }

    async activeKey(id) {
        return apiKeyRepository.active(id);
    }

    async validateKey(rawkey) {
        const hash = crypto
            .createHash('sha256')
            .update(rawkey)
            .digest('hex');

        return apiKeyRepository.findByHash(hash);
    }
}

module.exports = new ApiKeyService();