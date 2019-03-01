import rootReducer from '../reducers/root';
import {createStore, applyMiddleware} from 'redux';
import logger from "redux-logger";

export default (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(logger));
};