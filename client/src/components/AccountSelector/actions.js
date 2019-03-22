export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';

export const changeAccount = (value) => (
{
    type: CHANGE_ACCOUNT,
    value
});

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

export const LOGIN_START = 'LOGIN_START';

export function loginStart() {
    return {
        type: LOGIN_START,
    }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function loginSuccess(payload) {
    return {
        type: LOGIN_SUCCESS,
        data: payload
    }
}

export const LOGIN_ERROR = 'LOGIN_ERROR';

export function loginError(err) {
    return {
        type: LOGIN_ERROR,
        data: err
    }
}