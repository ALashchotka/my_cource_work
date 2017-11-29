const typeDefinitions = `
type User {
  email: String
  password: String,
  name: String,
  mobile: String
}
type Login {
 token: String
 message: String
}
type Mutation {
  checkUser(email: String, password: String): Login
  addUser(email: String, password: String, name: String, mobile: String): User
}
type Query {
  email: String
}
schema {
  query: Query
  mutation: Mutation
}
`;

module.exports = [typeDefinitions];
