import { GET_ORDER_BOOK } from './actions';

export default (state = {}, action) => {
    console.log(action)
    switch (action.type) {
        case GET_ORDER_BOOK:
            return {
                ...state,
                name: state.name + "a"
            };
        default:
            return state;
    }
};