const { gql } = require("apollo-server-express");
// Construct a schema, using GraphQL schema language
module.exports = gql`
  type Query {
    hello: String
    profiles: [Profile]!
    profile(id: Int!): Profile!
  }

  type Profile {
    id: Int!
    firstName: String
    email: String
  }
`;