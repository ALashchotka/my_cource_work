export const setUserToken = 'user/setUserToken';
export const setPage = 'tabNavigator/setPage';

export const setTokenAction = user => (dispatch) => {
  console.log(user);
  dispatch({
    type: setUserToken,
    user
  });
};

export const setCurrentPageAction = page => (dispatch) => {
  dispatch({
    type: setPage,
    page
  });
};
