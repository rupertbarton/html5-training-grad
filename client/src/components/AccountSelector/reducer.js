import * as actions from './actions';

const INITIAL_STATE = {
    currentAccount: "",
    AccountOrderBook: [],
    fetching: false,
    fetched: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
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
                AccountOrderBook: action.payload,
            }
        case actions.GET_ACCOUNT_ORDER_BOOK_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.data,
            }
        default:
            return state;
    }
};
