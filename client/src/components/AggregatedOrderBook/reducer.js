import * as actions from './actions';

const INITIAL_STATE = {
    aggregatedOrderBook: [],
    tradeHistory: [],
    fetching: false,
    fetched: false,
};

export default (state =  INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.GET_ORDER_BOOK_START:
            return {
                ...state,
                fetching: true
            };
        case actions.GET_ORDER_BOOK_RECEIVED: 
        return {
                ...state,
                fetching: false,
                fetched: true,
                aggregatedOrderBook: action.payload[0],
                tradeHistory: action.payload[1]
            }
        case actions.GET_ORDER_BOOK_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.data,
            }
        default:
            return state;
    }
};