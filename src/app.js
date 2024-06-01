const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes/v1");
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { version } = require("joi");




const app = express();


const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "XFLIX",
            description: "Video streaming application",
            contact: {
                name: "Crio.do",
                url: "https://www.crio.do/",
                email: "ping@criodo.com",
            },
            servers: [{
                url: "http://locatlhost:8082",
                description: "Development Server"
            }]
        }
    },
    apis: ['./src/routes/*.js']
};


const swaggerSpec = swaggerJsDoc(swaggerOptions);
const options = { explorer: true };
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, ))


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());


// Reroute all API request starting with "/v1" route
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// handle error
app.use(errorHandler);

module.exports = app;