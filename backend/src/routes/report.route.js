const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const reportController = require('../controllers/report.controller');

/**
 * @swagger
 * /api/reports/generate:
 *   post:
 *     summary: Generate usage report
 *     description: Generates a detailed usage report (PDF/CSV) for the authenticated user
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               month:
 *                 type: string
 *                 pattern: '^\d{4}-\d{2}$'
 *                 description: Month for the report (YYYY-MM)
 *                 example: 2026-06
 *               format:
 *                 type: string
 *                 enum: [pdf, csv]
 *                 description: Output format
 *                 default: pdf
 *               includeDetails:
 *                 type: boolean
 *                 description: Include per-endpoint breakdown
 *                 default: true
 *     responses:
 *       200:
 *         description: Report generated successfully
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
 *                     downloadUrl:
 *                       type: string
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *       202:
 *         description: Report generation queued (for large reports)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 jobId:
 *                   type: string
 *                 status:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid parameters
 */
router.post('/generate', authMiddleware, reportController.generate);

module.exports = router;