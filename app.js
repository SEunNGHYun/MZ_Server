const app = require('express')();
const helmet = require("helmet");
const morgan = require("morgan");
const env = require('dotenv');

const userRoutes = require('./routes/user');
const interestRoutes = require('./routes/interest')
const policyRoutes = require('./routes/policy')

const mariadb = require("./dbConnect")

env.config({ path: './.env' })

app.use(helmet())// 간단한 보안 설정을 자동으로 정해주는 helmet 
app.use(morgan("common"))
//서버 요청, 응답에 대한 로그를 터미널에 보여줌

mariadb.then(conn => {
    console.log(conn)
})
//데이터 베이스 연결

const port = 3000;

app.use("/user", userRoutes)
app.use('/interest', interestRoutes)
app.use('/policy', policyRoutes)

app.listen(port, () => {
  console.log(`${port}에서 서버 진행 중..`);
});