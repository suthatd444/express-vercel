// const dotenv = require('dotenv');
require('dotenv').config();
const express = require("express"),
    bodyParser = require("body-parser"),
    swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
const app = express()
const logger = require('morgan')
const cors = require('cors')

const signupRouter = require('./routes/authentication')
const profileRouter = require('./routes/profile.routes')
const shortLinksRouter = require('./routes/shortLinks.routes.js')


const port = process.env.PORT || 8080;
// const otpRouter = require('./routes/otp')
// const roleRouter = require('./routes/role');
// const policyRouter = require('./routes/policy');
// const companyRouter = require('./routes/company');
// const userRouter = require('./routes/user.routes.js');
// const agentSignupRouter = require('./routes/authentication.agent')
// const htmlDataRouter = require('./routes/htmlData')
// const policyCommissionRouter = require('./routes/policyCommission')
const swaggerDocument = require('./docs/swagger.json');

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
                url: "http://localhost:5007/api/v1",
            },
        ],
    },
    apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(swoptions);
app.use(
    "/api/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.use(cors());
//For Devlopement only
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json())
app.use('/api/v1', signupRouter)
app.use('/api/v1', profileRouter)
app.use('/api/v1', shortLinksRouter)
app.get('/api/v1', (req, res) => {
    res.send({ message: 'Welcome to divsly!' });
  });


app.listen(port, () => {
    console.log('Server Started on port ' + port);
})



const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log("Connect to the database!");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});