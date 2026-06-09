const { Queue } = require('bullmq');

const { connection } = require('../config/bullmq');

const reportQueue = new Queue(
    'weekly-report',
    {
        connection
    }
);

module.exports = reportQueue;