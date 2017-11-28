import { combineReducers } from 'redux';
import tabNavigator from './tabNavigator';
import user from './user';

export default combineReducers({
  tabNavigator,
  user
});
