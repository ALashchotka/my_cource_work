import { without } from 'lodash';

import { setUserInfo, addToFavourites, removeFromFavourites, addToBasket, removeFromBasket } from '../actions';

const initialState = {
  token: '',
  username: '',
  isAdmin: false,
  favourites: [],
  basket: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case setUserInfo:
      return {
        ...state,
        token: action.user.token,
        username: action.user.username,
        isAdmin: action.user.isAdmin || false,
        favourites: action.user.favourites || [],
        basket: action.user.basket || []
      };
    case addToFavourites: {
      const newFavourites = state.favourites;
      newFavourites.push(action.item);
      return {
        ...state,
        favourites: newFavourites
      };
    }
    case removeFromFavourites: 
      return {
        ...state,
        favourites: without(state.favourites, action.item)
      };
    case addToBasket: {
      const newBasket = state.basket;
      newBasket.push(action.item);
      return {
        ...state,
        basket: newBasket
      };
    }
    case removeFromBasket:
      return {
        ...state,
        basket: without(state.basket, action.item)
      };
    default: return state;
  }
}
