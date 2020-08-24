const { MongoDriver } = require("../../db/index");
const { gql } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
    getRedisValueByName,
    saveRedisUserByName,
} = require("../../redis/utils");
const generateUserWebTokenByAccount = require("../../utils/generaleUserWebToken");
const RESPONSE_STATUS = require("../../constants/response");

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

    type User {
        email: String
        password: String
        type: String
    }

    input UserLoginInput {
        username: String
        password: String
    }

    input UserRegisterInput {
        username: String
        password: String
    }

    type Query {
        getUsers: [User]
        test: ResultType
        redisString: TypeA
    }

    type Mutation {
        userLogin(input: UserLoginInput): UserResponse
        userRegister(input: UserRegisterInput): UserResponse
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
        userLogin: async (parent, { input: { username, password } }) => {
            try {
                // handle edge case
                if (!username || !password)
                    return {
                        status: RESPONSE_STATUS.FAIL,
                        message: "需要用户名和密码",
                        code: -1,
                    };

                // 如果在 redis 里面能找到user
                const foundUser = await getRedisValueByName(username);
                if (foundUser)
                    return {
                        status: RESPONSE_STATUS.SUCCESS,
                        message: "",
                        code: 1,
                    };

                // 如果在redis里面没有找到user
                const token = await generateUserWebTokenByAccount(
                    username,
                    password
                );

                saveRedisUserByName(username, token);

                return {
                    status: RESPONSE_STATUS.SUCCESS,
                    message: token,
                    code: 1,
                };
            } catch (error) {
                console.log(error.message);
            }
        },

        userRegister: async (parent, {input: {username, password}}) => {
            console.log('username, password: ', username, password);
            // 检查是否有重名

            // 将数据放到数据库里面

            return {
                status: RESPONSE_STATUS.SUCCESS,
                message: '',
                code: 1, 
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
