
"use strict";
let express = require("express");
let consign = require("consign");
let logger = require("winston");
let app = express();
let dotenv = require("dotenv");
dotenv.load({ path: ".env" });

let appPort = process.env.APP_PORT || "8082";
consign()
    .include("./helpers")
    .then("./middlewares/basicSettings.js")
    .then("./config")
    .then("./db/connection.js")
    .then("./middlewares/staticResources.js")
    .then("./services/mailService.js")
    .then("./models")
    .then("./auth/passport.js")
    .then("./services")
    .then("./controllers")
    .then("./routes")
    .then("./middlewares/mainRoutes.js")
    .then("./middlewares/errorHandler.js")
    .then("./initializeModels.js")
    .into(app);

app.listen(process.env.PORT || 5000, () => {
        logger.info(`Server started on port ${appPort}`);
    });
//si
//START: do not use the logic to set a fixed port, let heroku to assign the port
/*
if (process.env.NODE_ENV !== "test") {
    
    app.listen(appPort, () => {
        logger.info(`Server started on port ${appPort}`);
    });
}
*/
//

module.exports = app;
