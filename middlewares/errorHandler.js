"use strict";

module.exports = app => {

// development error handler
    if (app.get("env") === "development") {
        app.use((err, req, res, next) => {
            res.status(500);
            res.send(err);
        });
    }

// production error handler
    app.use((err, req, res, next) => {
        res.status(500);
        res.send(err);
    });

};