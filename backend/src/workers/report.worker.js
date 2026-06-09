const { Worker } = require('bullmq');

const { connection } = require('../config/bullmq');

const emailService = require('../services/email.service');

new Worker(
    'weekly-report',

    async (job) => {

        const { email, totalRequests } = job.data;

        await emailService.sendEmail(
            email,

            "Weekly Usage Report",

            `
                <h2>Usage Report</h2>
                <p>Total Requests:
                ${totalRequests}</p>
            
            `
        );

        console.log('Report sent');
    },
    {
        connection
    }
);