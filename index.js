const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { applyMiddleware } = require('graphql-middleware')
const { makeExecutableSchema } = require("@graphql-tools/schema");


const resolvers = require("./resolver");
const typeDefs = require("./schema");
const permissions = require('./permissions')

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});


async function newFunction() {
    const server = new ApolloServer({
        schema: applyMiddleware(schema, permissions),
        resolvers,
        context: ({ req }) => ({ user: req.headers.user || "" }),
    });
    await server.start();
    const app = express();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

newFunction();
