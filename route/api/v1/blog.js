/**
 * post
 * http://host:3000/api/v1/blog/add
 * {
 *    content,
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
  if (!req.body.content) {
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
  DB.GetCount('manage', 'article')
    .then((count) => {
      console.log('数量' + count);
      DB.CreateDoc('manage', 'article', {
        articleId: '' + YY + MM + DD + count,
        date: time.getTime(),
        author: req.user.username,
        content: req.body.content
      })
    })
    .then(doc => {
      res.send(doc)
    })
})

// 获取文章
router.get('/e/:articleId', (req, res) => {
  // 数据验证
  if (!req.params.articleId) {
    return res.status(400).json('参数错误')
  }
  DB.FindDoc('manage', 'article', {
    articleId: req.params.articleId
  }).then(doc => {
    res.send(doc)
  })
})


module.exports = router
