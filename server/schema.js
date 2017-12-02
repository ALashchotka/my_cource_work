const typeDefinitions = `
type User {
  email: String,
  password: String,
  username: String,
  mobile: String
}
type Clothing {
  id: String,
  name: String,
  price: Int,
  filter: String,
  topic: String,
  images: [String],
  sizes: [Int]
}
type Login {
  token: String,
  message: String,
  username: String
}
type Mutation {
  checkUser(email: String, password: String): Login
  addUser(email: String, password: String, username: String, mobile: String): User
  addClothing(id: String, name: String, price: Int, filter: String, topic: String, images: [String], sizes: [Int]): Clothing
  checkClothing(id: String): Clothing
  getClothings(filter: String, topic: String): [Clothing]
}
type Query {
  email: String
}
schema {
  query: Query,
  mutation: Mutation
}
`;

module.exports = [typeDefinitions];
