import { combineReducers } from 'redux';
import routes from './routes';
import token from './token';

export default combineReducers({
  routes,
  token,
});
