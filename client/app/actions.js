export const setUserInfo = 'user/setUserInfo';
export const setPage = 'tabNavigator/setPage';
export const setFilter = 'catalogue/setFilter';
export const setAllClothings = 'catalogue/setAllClothings';

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

export const setFilterAction = filter => (dispatch) => {
  dispatch({
    type: setFilter,
    filter
  });
};

export const setAllClothingsAction = data => (dispatch) => {
  dispatch({
    type: setAllClothings,
    data
  });
}