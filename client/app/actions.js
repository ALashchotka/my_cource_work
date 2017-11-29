export const setUserInfo = 'user/setUserInfo';
export const setPage = 'tabNavigator/setPage';

export const setUserInfoAction = user => (dispatch) => {
  dispatch({
    type: setUserInfo,
    user
  });
};

export const setCurrentPageAction = page => (dispatch) => {
  dispatch({
    type: setPage,
    page
  });
};
