const { graphqlHTTP } = require("express-graphql");
const { buildASTSchema } = require("graphql");
const gql = require('graphql-tag');
const {MongoDriver} = require('../db/index')


const graphQLSchema = buildASTSchema(gql`
    type UserTestFeetBack {
        name: String
        age: Int
    }

    type Query {
        hello: UserTestFeetBack 
        testQuery: String 
    }
`);

const graphQLRoot = {
    hello: async () => {
        try {
            return {
                name: 'user name',
                age: 12, 
            }
        } catch (error) {
            console.log('FAIL TO FETCH THE hello() ❌');
            console.log(error.message);
        }
        
    },

    testQuery: async () => {
        const db = new MongoDriver();
        const result = db.findOne();
        console.log(result);
        return "hello"
    }
};

const graphConfig = graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLRoot,
    graphiql: true,
});

module.exports = {
    graphConfig,
};
