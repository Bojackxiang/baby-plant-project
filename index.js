const express = require("express");
const app = express();
const { graphConfig } = require("./graph/schema");
const  connectionTest  = require("./db/connect");
require("dotenv").config();

connectionTest();

app.use("/", require("./routes/routes"));
app.use("/graphql", graphConfig);

app.listen(process.env.PORT, () => {
    console.log("Started listening 🚀");
});
