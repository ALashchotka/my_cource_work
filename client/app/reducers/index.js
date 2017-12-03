import { combineReducers } from 'redux';
import tabNavigator from './tabNavigator';
import user from './user';
import catalogue from './catalogue';

export default combineReducers({
  tabNavigator,
  user,
  catalogue
});
