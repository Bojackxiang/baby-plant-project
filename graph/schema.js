const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const graphQLSchema = buildSchema(`
    type Query {
        hello: String
    }
`)

const graphQLRoot = {
    hello: () => {
        return 'Hello world'
    }
}

const graphConfig = graphqlHTTP({
    schema: graphQLSchema, 
    rootValue: graphQLRoot,
    graphiql: true
})

module.exports = {
    graphConfig
}