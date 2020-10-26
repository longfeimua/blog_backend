/**
 * post
 * http://host:3000/api/v1/blog/add
 * {
 *    content,
 *    headline,
 *    describe
 * }
 * 
 * get
 * http://host:3000/api/v1/blog/:articleId
 * {
 *    articleId
 * }
 * 
 */

const express = require('express');
const router = express.Router()
const DB = require('../../../module/mongodb')

// 传入文章
router.post('/add', (req, res, next) => {
  //数据验证
  if (!req.body.content || !req.body.headline || !req.body.describe) {
    res.status(400).json('参数错误')
    return
  }
  next()
})


router.post('/add', (req, res) => {

  let time = new Date()
  let YY = time.getFullYear()
  let MM = time.getMonth() + 1
  let DD = time.getDate()

  //写入数据
  DB.getCount('manage', 'article')
    .then((count) => {
      DB.createDoc('manage', 'article', {
        articleId: '' + YY + MM + DD + count,
        date: YY + "-" + MM + "-" + DD + "-",
        author: req.user.username,
        content: req.body.content,
        headline: req.body.headline,
        describe: req.body.describe
      })
    })
    .then(doc => {
      res.send({
        code: 1
      })
    })
})

// 获取文章
router.get('/article/:articleId', (req, res) => {
  // 数据验证
  if (!req.params.articleId) {
    return res.status(400).json('参数错误')
  }
  DB.findDoc('manage', 'article', {
    articleId: req.params.articleId
  }).then(doc => {
    res.send(doc)
  })
})

//获取10条文章数据
router.get('/', (req, res) => {
  // 初始化值
  let skip = req.params.skip ? req.params.skip : 0
  let limit = req.params.limit ? req.params.limit : 10

  DB.findDoc('manage', 'article', {}, skip, limit).then(doc => {
    res.send(doc)
  })
})

module.exports = router
