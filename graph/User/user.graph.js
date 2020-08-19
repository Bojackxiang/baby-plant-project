const { MongoDriver } = require("../../db/index");
const { gql } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const UserSchema = gql`
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

    type TypeA {
        name: String
    }
    type TypeB {
        name: String
    }
    union ResultType = TypeA | TypeB

    # User type data
    type User {
        email: String
        password: String
        type: String
    }

    type Query {
        getUsers: [User]
        test: ResultType
    }

    type Mutation {
        userLogin: UserResponse
    }
`;

const UserResolvers = {
    ResultType: {
        __resolveType(){
            return "TypeA"
        }
    }, 
    Query: {
        getUsers: async () => {
            console.log("get user was triggered");
            const db = new MongoDriver();
            const result = await db.getUsers();
            return result;
        },

        test: async () => {
            return {
                name: 'hello world'
            }
        }
    },

    Mutation: {
        userLogin: async () => {
            return {
                status: "SUCCESS",
                message: "hello world",
            };
        },
    },
};

const UserQL = makeExecutableSchema({
    typeDefs: UserSchema,
    resolvers: UserResolvers
});


module.exports = {
    UserQL
};
