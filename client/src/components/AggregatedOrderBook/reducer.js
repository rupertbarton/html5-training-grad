import * as actions from './actions';
import { AggregatedOrderBook } from './AggregatedOrderBook';

const INITIAL_STATE = {
    aggregatedOrderBook: [],
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
                aggregatedOrderBook: action.data,
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