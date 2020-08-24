const RESPONSE_STATUS = require("../constants/response");

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
            console.log(error);
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

    async getUsers() {
        try {
            const db = await this.dbConnection();
            const userList = await db.collection("users").find().toArray();
            return userList;
        } catch (error) {
            console.log("FAIL TO COLLECT USER LIST ... ❌");
            console.log(error.message);
        }
    }

    async userLogin(updates) {
        try {
            const db = await this.dbConnection();
            const newUser = await db.collection("users").find();
            console.log(newUser);
            return {
                status: RESPONSE_STATUS.SUCCESS,
                message: error.message,
                code: 1,
            };
        } catch (error) {
            return {
                status: RESPONSE_STATUS.FAIL,
                message: error.message,
                code: -1,
            };
        }
    }

    async userRegister(updates){
        try {   
            const db = await this.dbConnection();
            const createdUser = await db.collection('user').insertOne(updates)
        } catch (error) {
            
        }
    }


}

module.exports = {
    MongoDriver,
};
