import rootReducer from './root';
import {createStore, applyMiddleware} from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";

export default (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, logger) +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};