const express = require("express");
    // bodyParser = require("body-parser"),
    // swaggerJsdoc = require("swagger-jsdoc"),
    // swaggerUi = require("swagger-ui-express");
const app = express()
require('dotenv').config();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json())
// const logger = require('morgan')
// const cors = require('cors')

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
// const swaggerDocument = require('./docs/swagger.json');

// const swoptions = {
//     definition: {
//         openapi: "3.1.0",
//         info: {
//             title: "Divsly Express API with Swagger",
//             version: "0.1.0",
//             description:
//                 "This is a simple CRUD API application made with Express and documented with Swagger",

//         }, "components": {
//             "securitySchemes": {
//                 "bearerAuth": {
//                     "type": "http",
//                     "scheme": "bearer",
//                     "bearerFormat": "JWT"
//                 }
//             }
//         },
//         "security": [
//             {
//                 "bearerAuth": []
//             }],
//         servers: [
//             {
//                 url: process.env.SWAGGER_ENDPOINT,
//             },
//         ],
//     },
//     apis: ["./routes/*.js"],
// };
// const specs = swaggerJsdoc(swoptions);
// app.use(
//     "/api-docs",
//     swaggerUi.serve,
//     swaggerUi.setup(specs)
// );

// app.use(cors());
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
