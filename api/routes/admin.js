const express = require('express');
const router = express();

const admin = require('../adminRoutes/admin')
const bikes = require('../adminRoutes/bikes')
const users = require('../adminRoutes/users')
const soldProd = require('../adminRoutes/soldProd')

router.use('/bikes', bikes)
router.use('/users', users)
router.use('/sold', soldProd)
router.use('/', admin)


module.exports = router