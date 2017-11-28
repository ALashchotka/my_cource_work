import { SET_PAGE } from '../constants';

const initialState = {
  page: 'main',
};

export default function reducer(state = initialState, action = {}) {
  console.log(action);
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
}
