import { setUserInfo } from '../actions';

const initialState = {
  token: '',
  username: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case setUserInfo:
      return {
        ...state,
        token: action.user.token,
        username: action.user.username
      };
    default:
      return state;
  }
}
