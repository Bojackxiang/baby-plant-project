const MongoClient = require("mongodb").MongoClient;

class MongoDriver {
    async dbConnection() {
        try {
            const client = await MongoClient.connect(`${process.env.DBUri}`, {
                useUnifiedTopology: true,
            });
            const db = client.db(`${process.env.DBName}`);
            return db;
        } catch (error) {
            console.log("FAIL TO COLLECT THE RIGHT DB ... ❌");
            console.log(error.message);
            return null;
        }
    }

    async findOne() {
        try {
            const db = await this.dbConnection();
            const userCount = await db.collection("users").find().count();
            console.log(userCount);
            return userCount;
        } catch (error) {
            console.log("FAIL TO COLLECT RIGHT DATA ... ❌");
            console.log(error.message);
        }
    }
}

module.exports = {
    MongoDriver,
};
