import rootReducer from '../root';
import {createStore, applyMiddleware} from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";

export default (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
};