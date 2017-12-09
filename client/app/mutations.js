import gql from 'graphql-tag';

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

export const checkUserMutation = gql`
mutation checkUser($email: String, $password: String) {
 checkUser(email: $email, password: $password) {
    token
    message
    username
    isAdmin,
    favourites,
    basket
  }
}
`;

export const addClothingMutation = gql`
mutation addClothing($name: String, $price: Int, $filter: String, $topic: String, $images: [String], $sizes: [Int]) {
  addClothing(name: $name, price: $price, filter: $filter, topic: $topic, images: $images, sizes: $sizes) {
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
    _id,
    name,
    price,
    filter,
    topic,
    images,
    sizes
  } 
}
`;

export const checkClothingMutation = gql`
mutation checkClothing($id: String) {
  checkClothing(id: $id) {
    _id,
    name,
    price,
    filter,
    topic,
    images,
    sizes
  } 
}

`