const { ApolloError, ForbiddenError } = require('apollo-server-express');
const profiles = require('./data')

const resolver = {
    Query: {
        hello: () => 'Hello world!',
        profiles: () => profiles,
        profile: (_, { id }) => {
            const index = profiles.findIndex(i => i.id === id)
            if (index === -1) return new ApolloError("Tweet not found")
            return profiles[index]
        }
    },
};

module.exports = resolver