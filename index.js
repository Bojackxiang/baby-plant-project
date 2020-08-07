const express = require('express');
const app = express();
const routeMiddleWares = require('./middlewares/route.logger');
require('dotenv').config()

app.use('', require('./routes/routes')) // 加不加 / 都可以

app.listen(process.env.PORT, () => {
    console.log('Started listening 🚀');
})