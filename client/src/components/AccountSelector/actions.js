export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';

export const changeAccount = (value) => (
{
    type: CHANGE_ACCOUNT,
    value
});

export const GET_ACCOUNT_ORDER_BOOK_START = 'order-book4';

export function getOrderBookStart() {
    return {
        type: GET_ACCOUNT_ORDER_BOOK_START,
    }
}

export const GET_ACCOUNT_ORDER_BOOK_RECEIVED = 'order-book5';

export function getOrderBookReceived(payload) {
    return {
        type: GET_ACCOUNT_ORDER_BOOK_RECEIVED,
        payload
    }
}

export const GET_ACCOUNT_ORDER_BOOK_ERROR = 'order-book6';

export function getOrderBookError(err) {
    return {
        type: GET_ACCOUNT_ORDER_BOOK_ERROR,
        data: err
    }
}