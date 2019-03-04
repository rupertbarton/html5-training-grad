import * as actions from './actions';

const INITIAL_STATE = {
    currentAccount: ""
};

export default (state = INITIAL_STATE, action) => {
    console.log("heyewarhgjna.ewlrgnae.lrnglaerg")
    switch(action.type){
        case actions.CHANGE_ACCOUNT:
            return {
                ...state,
                currentAccount: action.value
            };
        default:
            return state;
    }
};
