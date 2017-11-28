import { combineReducers } from 'redux';
import tabNavigator from './tabNavigator';
import token from './token';

export default combineReducers({
  tabNavigator,
  token
});
