import * as actions from './actions';

const INITIAL_STATE = {
  currentAccount: "",
  AccountOrderBook: [],
  fetching: false,
  fetched: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.CHANGE_ACCOUNT:
      return {
        ...state,
        currentAccount: action.value
      };
    case actions.GET_ACCOUNT_ORDER_BOOK_START:
      return {
        ...state,
        fetching: true
      };
    case actions.GET_ACCOUNT_ORDER_BOOK_RECEIVED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        currentAccount: action.payload[0],
        AccountOrderBook: action.payload[1],
      }
    case actions.GET_ACCOUNT_ORDER_BOOK_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.data,
      }
    case actions.LOGIN_START:
      return {
        ...state,
        fetching: true
      }
    case actions.LOGIN_SUCCESS:
    sessionStorage.setItem("jwt", action.data[0])
      return {
        ...state,
        fetching: false,
        fetched: true,
        AccountOrderBook: action.data[1],
        currentAccount: action.data[2]
      }

    case actions.LOGIN_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.data,
      }


    default:
      return state;
  }
};
