import { SET_TOKEN } from './constants';

export const setTokenDispatcher = token => (dispatch) => {
  console.log(token);
  dispatch({
    type: SET_TOKEN,
    token,
  });
};
