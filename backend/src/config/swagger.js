const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "API Marketplace",
            version: "1.0.0",
            description: `
## API Marketplace Platform

This API provides a complete marketplace solution with:
- 🔐 **Authentication**: JWT-based user auth and API key management
- 📊 **Usage Tracking**: Track every API call per user/key
- 🎯 **Rate Limiting**: Protect against abuse
- 💳 **Quota Management**: Monthly usage limits per plan
- 📈 **Reports**: Generate usage reports and analytics

### Authentication Methods

This API uses two authentication methods:

1. **Bearer Token (JWT)** - For dashboard endpoints (/api/usage, /api/keys, etc.)
   - Add to header: \`Authorization: Bearer <your_jwt_token>\`

2. **API Key** - For API endpoints (/api/chatapp, etc.)
   - Add to header: \`x-api-key: <your_api_key>\`
            `,
            contact: {
                name: "API Support",
                email: "support@apimarketplace.com"
            },
            license: {
                name: "MIT",
                url: "https://opensource.org/licenses/MIT"
            }
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development Server"
            },
            {
                url: "https://api.yourdomain.com",
                description: "Production Server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token for dashboard access'
                },
                apiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                    description: 'Enter your API key for API access'
                }
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string'
                        }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        plan: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                }
            }
        },
        tags: [
            {
                name: "Authentication",
                description: "User registration and login endpoints"
            },
            {
                name: "API Keys",
                description: "Manage API keys for programmatic access"
            },
            {
                name: "Chat API",
                description: "Chat application endpoints (requires API key)"
            },
            {
                name: "Usage & Analytics",
                description: "View API usage statistics"
            },
            {
                name: "Reports",
                description: "Generate usage reports"
            }
        ]
    },
    apis: [
        path.join(__dirname, '../routes/*.js')
    ]
};

module.exports = swaggerJsDoc(options);