const express = require('express');
const router = express.Router();

let DB = require('../../../DataBase/mongodb')

router.get('/', (req, res) => {
  DB.FindDoc('manage', 'user').then(doc => {
    res.send(doc)
  })
})

router.post('/add', (req, res) => {
  // 值验证
  if (!req.query.username || !req.query.password) {
    res.status(400).json('参数错误')
  } else {
    // id值生成(根据数据库数量累加id)
    DB.FindDoc('manage', 'user').then(doc => {
      let idNum = 100 + doc.length
      req.query.id = idNum
      DB.CreateDoc('manage', 'user', req.query).then(doc => {
        res.json(doc)
      })
    })
  }
})

module.exports = router