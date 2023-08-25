const mysql = require('mysql');
const env = require("./environment");

module.exports = {
    connectionDB:
        mysql.createConnection({
            host: env.HOST,
            user: env.USER,
            password: env.PASSWORD,
            database: env.DATABASE
        })
}