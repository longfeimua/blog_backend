/**
 * 添加消费记录 post
 * http://host:3000/api/v1/expenditure/add
 * {  
 *    level, 0.9--- 200,0.8---300,0.7----500,0.6----1000,0.5----2000
 *    id,卡号
 *    phoneNumber,电话
 *    cName,客户姓名
 *    comsumeTime,消费时间
 *    comsumeMoney 消费金额
 * }
 * 
 * 
 * 获取消费记录 get
 * http://host:3000/api/v1/expenditure/:phoneNumber
 * {
 *    phoneNumber
 * }
 * 
 */

const express = require('express');
const router = express.Router()
const DB = require('../../../module/mongodb')

// 添加消费记录
router.post('/add', (req, res, next) => {
  // console.log(req.body);
  //数据验证
  if (!req.body.phoneNumber || !req.body.comsumeMoney || !req.body.cName) {
    res.status(400).json('缺少参数')
    return
  }
  next()
})

router.post('/add', (req, res) => {

  let time = new Date().getTime()

  DB.createDoc('manage', 'expenditure', {
    cName: req.body.cName,
    phoneNumber: req.body.phoneNumber,
    comsumeMoney: req.body.comsumeMoney,
    comsumeTime: time
  })
    .then(doc => {
      res.send({
        code: 1,
        statu: 'success'
      })
    })
})

// 获取消费记录
router.get('/cId', (req, res) => {
  // 数据验证
  if (!req.params.cId) {
    return res.status(400).json('参数错误')
  }
  DB.findDoc('manage', 'expenditure', {
    cId: req.params.cId
  })
    .then()
    .then(doc => {
      res.send(doc)
    })
})

//获取10条数据
// router.get('/', (req, res) => {
//   // 初始化值
//   let skip = req.params.skip ? req.params.skip : 0
//   let limit = req.params.limit ? req.params.limit : 10

//   DB.findDoc('manage', 'article', {}, skip, limit).then(doc => {
//     res.send(doc)
//   })
// })

module.exports = router
