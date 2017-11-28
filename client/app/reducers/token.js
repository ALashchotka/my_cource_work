import { setUserToken } from '../actions';

const initialState = {
  token: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case setUserToken:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
}
