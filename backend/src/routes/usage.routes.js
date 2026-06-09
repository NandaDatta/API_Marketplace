const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const usageController = require('../controllers/usage.controller');

/**
 * @swagger
 * /api/usage:
 *   get:
 *     summary: Get API usage statistics
 *     description: Returns usage statistics for the authenticated user across all API keys
 *     tags: [Usage & Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}$'
 *         description: Filter by month (YYYY-MM format). Defaults to current month.
 *         example: 2026-06
 *     responses:
 *       200:
 *         description: Usage statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalRequests:
 *                       type: integer
 *                       example: 1542
 *                     month:
 *                       type: string
 *                       example: 2026-06
 *                     byEndpoint:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           endpoint:
 *                             type: string
 *                             example: /api/chatapp
 *                           count:
 *                             type: integer
 *                             example: 1200
 *                     byApiKey:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           keyName:
 *                             type: string
 *                           requests:
 *                             type: integer
 *       401:
 *         description: Unauthorized - Missing or invalid JWT
 *       400:
 *         description: Invalid month format
 */
router.get('/', authMiddleware, usageController.getUsage);

module.exports = router;