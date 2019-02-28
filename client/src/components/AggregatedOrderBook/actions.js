export const GET_ORDER_BOOK_START = 'order-book';

export function getOrderBookStart() {
    return {
        type: GET_ORDER_BOOK_START,
    }
}

export const GET_ORDER_BOOK_RECEIVED = 'order-book2';

export function getOrderBookReceived(payload) {
    console.log("Recieved action initiated")
    return {
        type: GET_ORDER_BOOK_RECEIVED,
        data: payload
    }
}

export const GET_ORDER_BOOK_ERROR = 'order-book3';

export function getOrderBookError(err) {
    return {
        type: GET_ORDER_BOOK_ERROR,
        data: err
    }
}