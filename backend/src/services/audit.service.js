const AuditLog = require('../models/aduitLog.model');

class AuditService {

    async logs(
        userId,
        action,
        metadata
    ) {

        console.log(
            'AUDIT LOG',
            userId,
            action
        );

        return AuditLog.create({
            userId,
            action,
            metadata
        });
    }
}

module.exports =
    new AuditService();