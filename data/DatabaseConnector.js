require('dotenv').config();
const pgp = require('pg-promise')();
const connString = `${process.env.DB_DRIVER}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SCHEMA}`;
let db = pgp(connString);

class DatabaseConnector {

    #driver = process.env.DB_DRIVER;
    #username = process.env.DB_USERNAME;
    #password = process.env.DB_PASSWORD;
    #host = process.env.DB_HOST;
    #port = process.env.DB_PORT;
    #schema = process.env.DB_SCHEMA;

    // #db = pgp(`${this.#driver}://${this.#username}:${this.#password}@${this.#host}:${this.#port}/${this.#schema}`);

    static getConn = () => {
        return db;
    }

}

module.exports = DatabaseConnector;