import * as actions from './actions';

const INITIAL_STATE = {
    accounts: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actions.ADD_ACCOUNT:
            return {
                ...state,
                accounts: [
                    ...state.accounts,
                    action.value
                ]
            };
        default:
            return state;
    }
};
