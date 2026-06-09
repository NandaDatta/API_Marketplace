const reportService = require('../services/report.service');
const asyncHandler = require('../utils/asyncHandler');

class ReportController {

    generate = asyncHandler(async(req, res) => {
        const result = await 
            reportService.generateReport(req.user.userId);
        res.json(result);
    });
}

module.exports = new ReportController();