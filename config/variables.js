"use strict";

let dotenv = require("dotenv");
dotenv.load({ path: ".env" });

module.exports = {
    secret: {
        key: "Caltia"
    },
    mysql: {
        username: process.env.CAL_DB_USERNAME,
        password: process.env.CAL_DB_PASSWORD,
        database: process.env.CAL_DB_NAME,
        options:{
            host: process.env.CAL_DB_HOST,
            timezone: '+05:30',
            dialect: "mysql",
            dialectOptions: {
                  charset: 'utf8mb4'
            }
        }
    },
    postgresql: {
        username: "lerepagr",
        password: "Ag8q2utgSsVy2tyR7_M9cNYbzsqSvwma",
        database: "lerepagr",
        host:"stampy.db.elephantsql.com",
        dialect: "postgres",
        port:"5432",
        timezone: '-05:00',
        dialect:'postgres',
        protocol: 'postgres',
        logging:  true,
        options:{
            host:"stampy.db.elephantsql.com",
            dialect:'postgres'
        },
        dialectOptions: {
            ssl: false
        },
        pool: {
            max: 10,
            min: 0,
            idle: 10000,
            acquire: 10000
        }
    }
};
