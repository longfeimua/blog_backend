const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.user);
  console.log('---------------------------')
  console.log(req.query)
  res.send('首页')
})

module.exports = router
