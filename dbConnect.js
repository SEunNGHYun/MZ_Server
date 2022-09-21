const mariadb = require("mariadb");
const env = require('dotenv')

env.config({ path: './.env' })

const pool = mariadb.createConnection({
  host: process.env.DATABASE_HOST || 'localhost', 
  user: process.env.DATABASE_USER || 'root', 
  password: process.env.DATABASE_PASSWORD,
  connectionLimit: process.env.DATABASE_LIMIT || 5,
  database: process.env.DATABASE
})
//database연결 설정(사용할 db선택, 연결제안, 사용자, db연결 호스트,포트 설정 ...)


module.exports = pool