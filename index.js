const express = require('express');
const app = express();
require('dotenv').config()

app.use('/', require('./routes/routes')) 

app.listen(process.env.PORT, () => {
    console.log('Started listening 🚀');
})