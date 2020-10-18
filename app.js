const express = require('express');
const bodyParser = require('body-parser')
const home = require('./route/home')
const api = require('./route/api/v1/api')
const cookieParser = require('cookie-parser')
const expressjwt = require('express-jwt')
const { PRIVITE_KEY } = require('./module/key')

//初始化
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

//验证token
app.use(expressjwt({
  secret: PRIVITE_KEY,
  algorithms: ['HS256']
}).unless({
  path: ['/api/v1/login', '/api/v1/register']
}))

/* 路由分发 */
app.use('/', home);
app.use('/api/v1', api);

/* 错误处理中间件 */
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('无效token');
  } else {
    res.status(404).send('请求错误，无匹配')
  }
})

app.listen(3000);
