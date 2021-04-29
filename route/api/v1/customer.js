/* 
  post
  http://host:3000/api/v1/customer/add
  {
    id,00001,88888 自定义卡号
    level：200-0.8（A）,300-0.8（B）,500-0.7(C),1000-0.6(D),2000-0.5(E) 接受值为[ABCDE]
    cName,
    phoneNumber,
    moneySum
  }


  获取客户信息
  get
  http://host:3000/api/v1/customer/:phoneNumber

  获取全部客户信息
  get
  http://host:3000/api/v1/customer/all

  skip,跳过几条
  limit 查询几条
*/

const express = require('express');
const router = express.Router();

let DB = require('../../../module/mongodb')


// 增加客户信息
router.post('/add', (req, res, next) => {
  // console.log(req.body);
  //数据验证
  if (!req.body.cName || !req.body.phoneNumber || !req.body.moneySum || !req.body.id || !req.body.level) {
    res.status(400).json('缺少参数')
    return
  }

  DB.findDoc('manage', 'customer', { cId: req.body.level + req.body.id })
    .then(doc => {
      if (doc[0]) return res.status(400).json({ code: -1, statu: false, mes: '已存在相同卡号客户' })
      next()
    })
})

router.post('/add', (req, res) => {

  let time = new Date().getTime();
  let cId = req.body.level + req.body.id;

  DB.createDoc('manage', 'customer', {
    cId: cId,
    level: req.body.level,
    cName: req.body.cName,
    phoneNumber: req.body.phoneNumber,
    moneySum: req.body.moneySum,
    createTime: time
  })
    .then(doc => {
      res.send({
        code: 1,
        statu: 'success'
      })
    })

})

// 获取全部客户信息
router.get('/all', (req, res) => {
  let skip = req.params.skip;
  let limit = req.params.limit;
  DB.findDoc('manage', 'customer', {}, skip, limit)
    .then(doc => {
      console.log(doc);
      res.send(doc)
    })
})

// 获取指定客户信息
router.get('/cId', (req, res) => {
  DB.findDoc('manage', 'customer', { cId: req.params.cId })
    .then(doc => {
      res.send(doc)
    })
})



module.exports = router