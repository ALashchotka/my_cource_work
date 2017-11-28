import { SET_TOKEN, SET_PAGE } from './constants';

export const setTokenDispatcher = token => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    token
  });
};

export const setCurrentPage = page => (dispatch) => {
  dispatch({
    type: SET_PAGE,
    page
  });
};
