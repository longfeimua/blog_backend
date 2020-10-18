/* 
  post
  http://host:3000/api/v1/login
  {
    username,
    password
  }

*/

const express = require('express');
const router = express.Router();
const DB = require('../../../module/mongodb')
const jwt = require('jsonwebtoken')
const { PRIVITE_KEY, EXPIRESD } = require('../../../module/key')

/* 登录模块 */
router.post('/', (req, res, next) => {
  /* 登录验证 */
  if (!req.body.username || !req.body.password) return res.json({ status: 'fail', info: '请输入账号或密码！' })
  next()
})

router.post('/', (req, res) => {
  /* 数据处理模块 */
  DB.FindDoc('manage', 'user', { username: req.body.username }).then(data => {
    if (!data[0]) {
      res.json({
        code: '-1',
        info: '无此用户！请检查输入是否正确'
      })
    } else {
      if (req.body.username === data[0].username && req.body.password === data[0].password) {
        // 生成基于jwt的token令牌
        token = jwt.sign({ username: req.body.username }, PRIVITE_KEY, { expiresIn: EXPIRESD })
        res.json({
          code: '1',
          info: '欢迎 ' + req.body.username,
          token: 'Bearer ' + token
        })
      } else {
        res.json({
          code: '-1',
          info: '账号或密码错误！'
        })
      }
    }
  })
})

module.exports = router