const ApiKey = require(
    '../models/apiKey.model'
);

class ApiKeyRepository {

    async create(data) {
        return ApiKey.create(data);
    }

    async findByUser(userId) {
        return ApiKey.find({userId});
    }

    async findById(id) {
        return ApiKey.findById(id);
    }

    async revoke(id) {
        return ApiKey.findByIdAndUpdate(
            id,
            {
                status: 'revoked'
            },
            {
                new: true
            }
        );
    }

    async active(id) {
        return ApiKey.findByIdAndUpdate(
            id,
            {
                status: 'active'
            },
            {
                new: true
            }
        )
    }

    async findByHash(hash) {
        return ApiKey.findOne({
            keyHash: hash,
            status: 'active'
        });
    }
}

module.exports = new ApiKeyRepository();