const express = require('express');
const router = express.Router();

const login = require('./login')
const register = require('./register')
const expenditure = require('./expenditure')
const customer = require('./customer')


/* api模块路由分发 */
router.use('/login', login)
router.use('/register', register)
router.use('/expenditure', expenditure)
router.use('/customer', customer)

module.exports = router
