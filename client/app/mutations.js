import gql from 'graphql-tag';

export const checkUserMutation = gql`
mutation checkUser($email: String, $password: String) {
 checkUser(email: $email, password: $password) {
    token
    message
    username
  }
}
`;

export const addUserMutation = gql`
mutation addUser($email: String, $password: String, $username: String, $mobile: String) {
  addUser(email: $email, password: $password, username: $username, mobile: $mobile) {
    email
    password,
    username,
    mobile
  }
}
`;

export const addClothingMutation = gql`
mutation addClothing($id: String, $name: String, $price: Int, $filter: String, $topic: String, $images: [String], $sizes: [Int]) {
  addClothing(id: $id, name: $name, price: $price, filter: $filter, topic: $topic, images: $images, sizes: $sizes) {
    id,
    name,
    price,
    filter,
    topic,
    images,
    sizes
  }
}
`;

export const getClothingsMutation = gql`
mutation getClothings($something: String) {
  getClothings(something: $something) {
    id,
    name,
    price,
    filter,
    topic,
    images,
    sizes
  } 
}
`;