/**
 * Description:
 *      Every time when create schema or resolvers, add them here to the list
 */
// graphql tools
const { graphqlHTTP } = require("express-graphql");
const { mergeSchemas, mergeResolvers } = require("graphql-tools");
// user graphql query
const { UserResolver, UserSchema } = require("./User/user.graph");

// merge schemas and resolvers
const mergedSchemas = mergeSchemas({
    schemas: [UserSchema],
});
const mergedResolvers = mergeResolvers([UserResolver]);

// graphql config
const graphConfig = graphqlHTTP({
    schema: mergedSchemas,
    rootValue: mergedResolvers,
    graphiql: true,
});

module.exports = {
    graphConfig,
};
