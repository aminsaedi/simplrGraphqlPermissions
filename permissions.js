const { allow, deny, shield, rule } = require("graphql-shield");
const { ForbiddenError } = require("apollo-server-express");

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const isLoggedIn = rule({cache: "contextual"})(
  async (parent, args, {user}) => {
    await sleep(2000)
    if (user) return true
    return  new ForbiddenError("Not Authorized");
  }
)

const permissions = shield({
  Profile: {
    email: isLoggedIn
  }
});

module.exports = permissions;