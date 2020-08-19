/**
 * Description:
 *      Every time when create schema or resolvers, add them here to the list
 */
// graphql tools
const { graphqlHTTP } = require("express-graphql");
// user graphql query
const { UserQL } = require("./User/user.graph");
const { mergeSchemas } = require("graphql-tools");

// merge schemas and resolvers
const mergedSchema = mergeSchemas({ schemas: [UserQL] });

// graphql config
const graphConfig = graphqlHTTP({
    schema: mergedSchema,
    graphiql: true,
});

module.exports = {
    graphConfig,
};
