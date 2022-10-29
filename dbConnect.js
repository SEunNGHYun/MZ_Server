const mariadb = require("mariadb");
const env = require('dotenv')

env.config({ path: './.env' })


export default mariadb.createConnection({
  host: process.env.DATABASE_HOST || 'localhost', 
  user: process.env.DATABASE_USER || 'root', 
  password: process.env.DATABASE_PASSWORD,
  connectionLimit: process.env.DATABASE_LIMIT || 5,
  database: process.env.DATABASE
})

