const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.trasnporter = 
            nodemailer.createTransport({
                service: 'gmail',

                auth: {
                    user: 
                        process.env.EMAIL_USER,

                    pass: 
                        process.env.EMAIL_PASS
                }
            });
    }

    async sendEmail(to, subject, html) {
        return this.trasnporter.sendMail({
            from: 
                process.env.EMAIL_USER,
            to,
            subject,
            html
        });
    }
}

module.exports = new EmailService();