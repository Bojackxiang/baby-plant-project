var MongoClient = require("mongodb").MongoClient;

const connectionTest = () =>
    MongoClient.connect(
        `${process.env.DBUri}/${process.env.DBName}`,
        { useUnifiedTopology: true },
        (err, db) => {
            if (!err) {
                console.log("DB connectionTest SUCCESS ✅");
            }
        }
    );

module.exports = connectionTest;
