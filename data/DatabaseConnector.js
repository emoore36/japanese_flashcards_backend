require('dotenv').config();
const pgp = require('pg-promise')();

class DatabaseConnector {
    static #driver = process.env.DB_DRIVER;
    static #username = process.env.DB_USERNAME;
    static #password = process.env.DB_PASSWORD;
    static #host = process.env.DB_HOST;
    static #port = process.env.DB_PORT;
    static #schema = process.env.DB_SCHEMA;

    static #connString = `${this.#driver}://${this.#username}:${this.#password}@${this.#host}:${this.#port}/${this.#schema}`;

    static #db = pgp(this.#connString);

    static getConn = () => {
        return this.#db;
    };
}

module.exports = DatabaseConnector;
