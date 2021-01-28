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

// 设置跨域和相应数据格式
app.all('/api/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.sendStatus(200)
		/*让options请求快速返回*/ 
		else next()
})

//验证token
app.use(expressjwt({
  secret: PRIVITE_KEY,
  algorithms: ['HS256']
}).unless({
  path: [
    '/api/v1/login',
    '/api/v1/register',
    '/api/v1/blog',
    /^\/api\/v1\/blog\/article\/.*/   /* unless用到正则表达式（regex）表示动态路由 */
  ]
}))

/* 路由分发 */
app.use('/', home);
app.use('/api/v1', api);

/* 错误处理中间件 */
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.sendStatus(401)
  } else {
    res.sendStatus(404)
  }
})

app.listen(3000,()=>{console.log("listen on port 3000")});
