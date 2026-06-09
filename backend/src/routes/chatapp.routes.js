const express = require('express');
const router = express.Router();
const apiKeyMiddleware = require('../middleware/apiKey.middleware');
const chatAppController = require('../controllers/chatApp.controller');
const usageMiddleware = require('../middleware/usage.middleware');
const quotaMiddleware = require('../middleware/quota.middleware');

/**
 * @swagger
 * /api/chatapp:
 *   get:
 *     summary: Get chat messages
 *     description: Returns chat messages for a specific room. Requires API key authentication.
 *     tags: [Chat API]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The chat room identifier
 *         example: frontend
 *     responses:
 *       200:
 *         description: Chat messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       message:
 *                         type: string
 *                       user:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     roomId:
 *                       type: string
 *                     total:
 *                       type: integer
 *       401:
 *         description: API key missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: API key missing
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Too many requests
 *       403:
 *         description: Quota exceeded (monthly limit reached)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Monthly quota exceeded
 */
router.get('/',
    apiKeyMiddleware,
    quotaMiddleware,
    usageMiddleware,
    chatAppController.getChat
);

module.exports = router;