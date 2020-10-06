const express = require('express');
const { route } = require('../../home');
const router = express.Router();

const login = require('./login')
const store = require('./store')
/* api模块路由分发 */
router.use('/login',login)
router.use('/store',store)

module.exports = router
