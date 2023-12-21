const express = require("express"),
    bodyParser = require("body-parser"),
    swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
const app = express()
require('dotenv').config();
var corsoption = {
    origin: ["http://localhost:4200", "https://react-backend.miinii.me"], //origin from where you requesting
    credentials: true
}
const CSS_URL ="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.1.0/swagger-ui.min.css";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
const cors = require('cors')
app.use(cors(corsoption));
const signupRouter = require('./routes/authentication')
const profileRouter = require('./routes/profile.routes')
const shortLinksRouter = require('./routes/shortLinks.routes.js')
// const otpRouter = require('./routes/otp')
// const roleRouter = require('./routes/role');
// const policyRouter = require('./routes/policy');
// const companyRouter = require('./routes/company');
// const userRouter = require('./routes/user.routes.js');
// const agentSignupRouter = require('./routes/authentication.agent')
// const htmlDataRouter = require('./routes/htmlData')
// const policyCommissionRouter = require('./routes/policyCommission')

const swoptions = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Divsly Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",

        }, "components": {
            "securitySchemes": {
                "bearerAuth": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT"
                }
            }
        },
        "security": [
            {
                "bearerAuth": []
            }],
        servers: [
            {
                url: process.env.SWAGGER_ENDPOINT,
            },
            {
                url: 'https://express-vercel-three-smoky.vercel.app/api/v1',
            },
        ],
    },
    apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(swoptions);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs,{ customCssUrl: CSS_URL })
);

//For Devlopement only
// app.use(logger('dev'));

app.use('/api/v1', signupRouter)
app.use('/api/v1', profileRouter)
app.use('/api/v1', shortLinksRouter)
app.get('/', (req, res) => {
    res.json({
      message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    });
  });

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server Started on port ' + PORT);
})
