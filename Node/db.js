const mysql = require("mysql2/promise");
require('dotenv').config();

const hostName = process.env.host;
const portDB = process.env.port;
const userName = process.env.user;
const password = process.env.password;
const database = process.env.database;

let pool;

exports.connect = async function connect() {
    if (pool) return pool;

    try {
        pool = await mysql.createPool({
            host: hostName,
            port: portDB,
            user: userName,
            password: password,
            database: database,
            connectionLimit: 10 // Adjust based on your requirements
        });

        return pool;
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}
