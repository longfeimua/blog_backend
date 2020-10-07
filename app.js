const express = require('express');
const bodyParser = require('body-parser')
const home = require('./route/home')
const api = require('./route/api/v1/api')

//初始化
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* 路由分发 */
app.use('/', home);
app.use('/api/v1', api);

/* 错误处理中间件 */
app.use((req, res, next) => {
  res.status(404).send('请求错误')
})

app.listen(3000);
