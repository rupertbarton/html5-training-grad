export const SEND_NEW_ORDER_START = 'order-book7';

export function sendNewOrderStart() {
    return {
        type: SEND_NEW_ORDER_START,
    }
}

export const NEW_ORDER_SENT = 'order-book8';

export function newOrderSent(payload) {
    return {
        type: NEW_ORDER_SENT,
        payload
    }
}

export const SEND_NEW_ORDER_ERROR = 'order-book9';

export function sendNewOrderError(err) {
    return {
        type: SEND_NEW_ORDER_ERROR,
        data: err
    }
}