const express = require('express');
const router = express.Router();

const login = require('./login')
const register = require('./register')
const blog = require('./blog')


/* api模块路由分发 */
router.use('/login', login)
router.use('/register', register)
router.use('/blog', blog)

module.exports = router
