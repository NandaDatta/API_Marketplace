require('dotenv').config();
require('./src/workers/report.worker')

const app = require('./src/app');

const connectDB = require('./src/config/db');

const { connectRedis } = require('./src/config/redis');

async function startServer() {
    await connectDB();

    await connectRedis();

    app.listen(process.env.PORT, () => {
        console.log(
            'Server started'
        );
    });
};

startServer();