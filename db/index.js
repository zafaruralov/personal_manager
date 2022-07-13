const Pool = require('pg').Pool
require('dotenv').config()

const {PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE, PG_PORT} = process.env

const Database = new Pool({
    host:PG_HOST,
    user:PG_USER,
    password:PG_PASSWORD,
    database:PG_DATABASE,
    port:PG_PORT
})

module.exports = Database