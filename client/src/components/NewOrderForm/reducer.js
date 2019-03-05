import * as actions from './actions';

const INITIAL_STATE = {
    delivering: false,
    delivered: false,
    aggregatedOrderBook: [],
    tradeHistory: [],
};

export default (state =  INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.SEND_NEW_ORDER_START:
            return {
                ...state,
                delivering: true
            };
        case actions.NEW_ORDER_SENT:
        return {
                ...state,
                delivering: false,
                delivered: true,
                // aggregatedOrderBook: action.payload[0],
                // tradeHistory: action.payload[2],
                // AccountOrderBook: action.payload[1],
            }
        case actions.SEND_NEW_ORDER_ERROR:
            return {
                ...state,
                delivering: false,
                error: action.data,
            }
        default:
            return state;
    }
};