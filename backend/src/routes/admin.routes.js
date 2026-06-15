const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const adminMiddleware = require('../middleware/admin.middleware');

const adminController = require('../controllers/admin.controller');

router.get('/users',
    authMiddleware,
    adminMiddleware,
    adminController.getUsers
);

router.get('/dashboard',
    authMiddleware,
    adminMiddleware,
    adminController.getDashboard
);

router.get('/activity',
    authMiddleware,
    adminMiddleware,
    adminController.getActivity
);

router.get('/apikeys',
    authMiddleware,
    adminMiddleware,
    adminController.getApiKeys
);

router.get('/apikeys/:id/status',
    authMiddleware,
    adminMiddleware,
    adminController.getActiveApiKeys
);

router.patch('/apikeys/:id/active',
    authMiddleware,
    adminMiddleware,
    adminController.enableApi
);

router.patch('/apikeys/:id/revoke',
    authMiddleware,
    adminMiddleware,
    adminController.revokeApi
);


module.exports = router;