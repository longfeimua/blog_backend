const express = require('express')
const app = express()
const router = express.Router()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


router.post('/', (req, res) => {
  console.log('---------------------------');
  console.log(req.body);
  res.send('首页')
})

module.exports = router
