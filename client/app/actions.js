export const setUserInfo = 'user/setUserInfo';
export const setPage = 'tabNavigator/setPage';
export const setFilter = 'catalogue/setFilter';
export const setAllClothings = 'catalogue/setAllClothings';
export const setCurrentClothingItem = 'catalogue/setCurrentClothingItem';
export const addToFavourites = 'user/addToFavourites';
export const removeFromFavourites = 'user/removeFromFavourites';

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

export const setCurrentClothingItemAction = item => (dispatch) => {
  dispatch({
    type: setCurrentClothingItem,
    item
  });
}

export const addToFavouritesAction = item => (dispatch) => {
  dispatch({
    type: addToFavourites,
    item
  });
}

export const removeFromFavouritesAction = item => (dispatch) => {
  dispatch({
    type: removeFromFavourites,
    item
  });
}