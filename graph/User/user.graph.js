const { MongoDriver } = require("../../db/index");
const { makeExecutableSchema, gql } = require("apollo-server");

const UserSchema = makeExecutableSchema({
    typeDefs: gql`
        # Response Status type 
        enum UserResponseType {
            SUCCESS
            FAIL
            ERROR
        }

        # User response 
        type UserResponse {
            status: UserResponseType
            message: String
        }

        # User type data
        type User {
            email: String
            password: String
            type: String
        }

        type Query {
            getUsers: [User]
        }

        type Mutation {
            userLogin: UserResponse
        }
    `,
});

const UserResolver = {
    getUsers: async () => {
        const db = new MongoDriver();
        const result = await db.getUsers();
        return result;
    },

    userLogin: async () => {
        return {
            status: "SUCCESS",
            message: "hello world",
        };
    },
};

module.exports = {
    UserSchema,
    UserResolver,
};
