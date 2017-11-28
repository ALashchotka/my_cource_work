import { setPage } from '../actions';

const initialState = {
  page: 'main'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case setPage:
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
}
