const express = require('express');
const app = express();
const {graphConfig} = require('./graph/schema')
require('dotenv').config()

app.use('/', require('./routes/routes')) 
app.use('/graphql', graphConfig);

app.listen(process.env.PORT, () => {
    console.log('Started listening 🚀');
})