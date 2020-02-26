"use strict";

module.exports = app => {
    let Sequelize = require("sequelize");
    let config = app.config.variables;
  // let userModel = app.models.user.UserModelSchema;
    var sequelize = new Sequelize(config.postgresql.database, config.postgresql.username, config.postgresql.password, config.postgresql);

    return sequelize;
};

