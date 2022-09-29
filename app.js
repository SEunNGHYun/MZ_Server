const app = require('express')();
const helmet = require("helmet");
const morgan = require("morgan");
const env = require('dotenv');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const interestRoutes = require('./routes/interest')
const policyRoutes = require('./routes/policy')
const scrabRoutes = require('./routes/scrab')
const mainRoutes = require('./routes/main')
const tokenRoutes = require('./routes/token')

env.config({ path: './.env' })

app.use(bodyParser.json({
  limit : 200
}))
app.use(helmet())
// 간단 한 보안 설정을 자동으로 정해주는 helmet 
app.use(morgan("common"))
//서버 요청, 응답에 대한 로그를 터미널에 보여줌

//데이터 베이스 연결
const port = 3000;

app.use("/user", userRoutes)
app.use('/interest', interestRoutes)
app.use('/policy', policyRoutes)
app.use('/scrab', scrabRoutes)
app.use('/main', mainRoutes)
app.use('/token', tokenRoutes)

app.listen(port, () => {
  console.log(`${port}에서 서버 진행 중..`);
});