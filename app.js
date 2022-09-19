const app = require('express')();
const helmet = require("helmet");
const morgan = require("morgan");
const mariadb = require("mariadb");
const env = require('dotenv')

env.config({ path: './.env' })

const pool = mariadb.createPool({
    host: process.env.DATABASE_HOST || 'localhost', 
    user: process.env.DATABASE_USER || 'root', 
    password: process.env.DATABASE_PASSWORD,
    connectionLimit: process.env.DATABASE_LIMIT || 5
})
//database연결 설정(사용할 db선택, 연결제안, 사용자, db연결 호스트,포트 설정 ...)

app.use(helmet())// 간단한 보안 설정을 자동으로 정해주는 helmet 
app.use(morgan("common"))
//서버 요청, 응답에 대한 로그를 터미널에 보여줌

pool.getConnection()
  .then(conn => {
    console.log(conn)
})
//데이터 베이스 연결

const port = 3000;

app.get("/", () => {
  console.log("get start")
})


app.listen(port, () => {
  console.log(`${port}에서 서버 진행 중..`);
});