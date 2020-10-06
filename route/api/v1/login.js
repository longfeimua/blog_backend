const express = require('express');
const router = express.Router();
const DB = require('../../../DataBase/mongodb')

/* 登录模块 */
router.post('/', (req, res, next) => {
  /* 登录验证 */
  if (!req.query.username || !req.query.password) return res.json({ status: 'fail', info: '请输入账号或密码！' })
  next()
})

router.post('/', (req, res) => {
  /* 数据处理模块 */
  DB.FindDoc('manage', 'user', { username: req.query.username }).then(data => {
    if (!data[0]) {
      res.json({
        status: 'fail',
        info: '无此用户！请检查输入是否正确'
      })
    } else {
      if (req.query.username === data[0].username && req.query.password === data[0].password) {
        res.json({
          status: 'sucsess',
          info: '欢迎 ' + req.query.username,
          token: 'admin' + data[0]._id
        })
      } else {
        res.json({
          status: 'fail',
          info: '账号或密码错误！'
        })
      }
    }
  })
})

module.exports = router