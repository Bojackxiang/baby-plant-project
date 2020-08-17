const {MongoDriver} = require('../../db/index')
const { makeExecutableSchema, gql } = require("apollo-server");


const UserSchema = makeExecutableSchema({
    typeDefs: gql`
        type User {
            email: String
            password: String
            type: String
        }
        type Query {
            getUsers: [User]
        }
    `,
});

const UserResolver = {
    getUsers: async () => {
        const db = new MongoDriver();
        const result = await db.getUsers();
        return result;
    }
}

module.exports = {
    UserSchema,
    UserResolver
}