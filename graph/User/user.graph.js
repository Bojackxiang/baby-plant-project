const { MongoDriver } = require("../../db/index");
const { gql } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { getRedisValueByName } = require("../../redis/utils");
const generateUserWebTokenByAccount = require("../../utils/generaleUserWebToken");

const UserSchema = gql`
    enum UserResponseType {
        SUCCESS
        FAIL
        ERROR
    }

    # User response
    type UserResponse {
        status: UserResponseType
        message: String
        code: Int
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

    input UserLoginInput {
        username: String
        password: String
    }

    type Query {
        getUsers: [User]
        test: ResultType
        redisString: TypeA
    }

    type Mutation {
        userLogin(userInput: UserLoginInput): UserResponse
    }
`;

const UserResolvers = {
    ResultType: {
        __resolveType() {
            return "TypeA";
        },
    },
    Query: {
        getUsers: async () => {
            console.log("get user was triggered");
            const db = new MongoDriver();
            const result = await db.getUsers();
            return result;
        },
    },

    Mutation: {
        userLogin: async (parent, { userInput: { username, password } }) => {
            try {
                // 如果在 redis 里面能找到user
                const foundUser = await getRedisValueByName(username);
                if (foundUser)
                    return {
                        status: "SUCCESS",
                        message: "",
                        code: 1,
                    };

                // 如果在redis里面没有找到user
                const token = await generateUserWebTokenByAccount(
                    username,
                    password
                );

                return {
                    status: "SUCCESS",
                    message: token,
                    code: 1,
                };
            } catch (error) {
                console.log(error.message);
            }
        },
    },
};

const UserQL = makeExecutableSchema({
    typeDefs: UserSchema,
    resolvers: UserResolvers,
});

module.exports = {
    UserQL,
};
