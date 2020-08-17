const merge = require("lodash/merge");
// user graphql query
const { UserResolver, UserSchema } = require("./User/user.graph");
// graphql
const { graphqlHTTP } = require("express-graphql");
const { mergeSchemas, mergeResolvers } = require("graphql-tools");
// todo: figure out how to use the merge resolvers


const mergedSchemas = mergeSchemas({
    schemas: [UserSchema],
})

const mergedResolvers = mergeResolvers(
    [UserResolver]
)

const graphConfig = graphqlHTTP({
    schema: mergedSchemas,
    rootValue: mergedResolvers,
    graphiql: true,
});

module.exports = {
    graphConfig,
};
