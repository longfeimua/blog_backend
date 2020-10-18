/* 
  post
  http://host:3000/api/v1/register
  {
    username,
    password
  }
*/

const express = require('express');
const router = express.Router();

let DB = require('../../../module/mongodb')

router.post('/', (req, res, next) => {
  // req参数校验
  if (!req.body.username || !req.body.password) {
    res.status(400).json('参数错误')
    return
  }
  DB.FindDoc('manage', 'user', { username: req.body.username }).then(doc => {
    if (doc[0]) return res.status(400).json('用户已被注册')
    next()
  })
})

router.post('/', (req, res) => {
  // id值生成(根据数据库数量累加id)
  DB.GetCount('manage', 'user').then(doc => {
    req.query = {
      id: 100 + doc,
      username: req.body.username,
      password: req.body.password
    }
    DB.CreateDoc('manage', 'user', req.query).then(doc => {
      res.json({
        code: 1,
        info: '注册成功'
      })
    })
  })
})

module.exports = router