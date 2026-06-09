const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const apiKeyRoutes = require('./routes/apiKey.routes');
const chatAppRoutes = require('./routes/chatapp.routes');
const usageRoutes = require('./routes/usage.routes');
const reportRoutes = require('./routes/report.route');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');


const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);

app.use('/api/keys', apiKeyRoutes);

app.use('/api/chatapp', chatAppRoutes);

app.use('/api/usage', usageRoutes);

app.use('/api/reports', reportRoutes);

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'API running.'
    });
});



module.exports = app;