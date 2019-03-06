export const GET_ACCOUNT_ORDER_BOOK_START = 'GET_ACCOUNT_ORDER_BOOK_START';

export function getOrderBookStart() {
    return {
        type: GET_ACCOUNT_ORDER_BOOK_START,
    }
}

export const GET_ACCOUNT_ORDER_BOOK_RECEIVED = 'GET_ACCOUNT_ORDER_BOOK_RECEIVED';

export function getOrderBookReceived(payload) {
    return {
        type: GET_ACCOUNT_ORDER_BOOK_RECEIVED,
        payload
    }
}

export const GET_ACCOUNT_ORDER_BOOK_ERROR = 'GET_ACCOUNT_ORDER_BOOK_ERROR';

export function getOrderBookError(err) {
    return {
        type: GET_ACCOUNT_ORDER_BOOK_ERROR,
        data: err
    }
}