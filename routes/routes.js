const express = require('express');
const router = express.Router();
const routeMiddleWares = require('../middlewares/route.logger');

router.get('/test', routeMiddleWares.routeLogger, (req, res) => {
    res.send('hello')
    console.log('hello');
})

module.exports = router