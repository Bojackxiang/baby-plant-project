const express = require("express");
const app = express();
const cors = require("cors");
const { graphConfig } = require("./graph/schema");
const connectionTest = require("./db/connect");
const {redisConnectionTest} = require('./redis/index')

require("dotenv").config();

connectionTest();
redisConnectionTest()

app.use(cors());
app.use("/", require("./routes/routes"));
app.use("/graphql", graphConfig);

app.listen(process.env.PORT, () => {
    console.log("Started listening 🚀");
});
