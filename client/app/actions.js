export const setUserToken = 'user/setUserToken';
export const setPage = 'tabNavigator/setPage';

export const setTokenAction = token => (dispatch) => {
  dispatch({
    type: setUserToken,
    token
  });
};

export const setCurrentPageAction = page => (dispatch) => {
  dispatch({
    type: setPage,
    page
  });
};
