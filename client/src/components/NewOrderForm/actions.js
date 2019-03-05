export const SEND_NEW_ORDER_START = 'SEND_NEW_ORDER_START';

export function sendNewOrderStart() {
    return {
        type: SEND_NEW_ORDER_START,
    }
}

export const NEW_ORDER_SENT = 'NEW_ORDER_SENT';

export function newOrderSent() {
    return {
        type: NEW_ORDER_SENT,
    }
}

export const SEND_NEW_ORDER_ERROR = 'SEND_NEW_ORDER_ERROR';

export function sendNewOrderError(err) {
    return {
        type: SEND_NEW_ORDER_ERROR,
        data: err
    }
}