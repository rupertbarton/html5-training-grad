export const GET_ORDER_BOOK_START = 'GET_ORDER_BOOK_START';

export function getOrderBookStart() {
    return {
        type: GET_ORDER_BOOK_START,
    }
}

export const GET_ORDER_BOOK_RECEIVED = 'GET_ORDER_BOOK_RECEIVED';

export function getOrderBookReceived(payload) {
    return {
        type: GET_ORDER_BOOK_RECEIVED,
        payload
    }
}

export const GET_ORDER_BOOK_ERROR = 'GET_ORDER_BOOK_ERROR';

export function getOrderBookError(err) {
    return {
        type: GET_ORDER_BOOK_ERROR,
        data: err
    }
}